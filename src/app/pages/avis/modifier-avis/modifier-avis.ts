import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RestaurantService } from '../../../shared/services/user/user.service';


@Component({
  selector: 'app-modifier-avis',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-avis.html',
  styleUrl: './modifier-avis.scss',
})
export class ModifierAvis {
  private router = inject(Router);
  restaurant_id:number|null
  formData!: FormGroup;
  user:any
    data_id=0
  constructor(private route: ActivatedRoute,private authSerivce:AuthSaasRestoService, private restaurantService:RestaurantService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
    this.load_data(this.data_id )
   
    this.formData = this.fb.group({
      approuve: [false, [Validators.required, ]],
    });

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )

  }


  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
   
    console.log(this.formData.value);
   
    this.crudSaasService.updateAvis(this.data_id,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/avis/liste-avis']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la modification","Echec")
      }
    });


    // appel API ici
  }

  
  data:any

  verifier_roles_et_societes(user: any, currentRestaurant: any) {
    console.log('user', user);
    console.log('restaurant', currentRestaurant);

    const prioriteRoleUser = user?.datas?.Role?.priorite;
    const societeUser = user?.datas?.societe_id;

    const societeRestaurant = currentRestaurant?.societe_id;
    const restaurantId = currentRestaurant?.restaurant_id;

    const restaurantsAutorises =
      user?.datas?.Restaurants?.map((r: any) => r.id) || [];

    // super admin
    if (prioriteRoleUser === 1) return;
    console.log('societeUser',societeUser,'societeRestaurant',societeRestaurant)

    // autre société
    if (societeUser !== societeRestaurant) {
      this.notificationsService.error(
        "Vous ne pouvez pas modifier un avis d'une autre société",
        "Echec"
      );
      this.router.navigate(['/dashboard/default']);
      return;
    }

    // gestionnaire restaurant → seulement ses restos
    if (prioriteRoleUser === 4) {
      const canAccess = restaurantsAutorises.includes(restaurantId);

      if (!canAccess) {
        this.notificationsService.error(
          "Vous ne pouvez pas modifier cette table",
          "Echec"
        );
        this.router.navigate(['/dashboard/default']);
        return;
      }
    }

    if (prioriteRoleUser >= 5) {
      this.notificationsService.error(
        "Vous n'avez pas les permissions nécessaires",
        "Echec"
      );
      this.router.navigate(['/dashboard/default']);
      return;
    }
  }


  load_data(id:number){

    this.crudSaasService.getAvisById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)
        this.verifier_roles_et_societes(this.user,this.data)

     

        this.formData = this.fb.group({
          approuve: [this.data.approuve, [Validators.required, ]],
        });
        
      },
      error: (err) => {
        if (err.status === 404) {
        this.notificationsService.error("Avis introuvable", "Echec");
      } else if (err.status === 400) {
        this.notificationsService.error("ID de avis invalide", "Echec");
      } else {
        this.notificationsService.error("Erreur lors de la récupération", "Echec");
      }
      this.router.navigate(['/avis/liste-avis']);
      }
    });

  }


}


