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
  selector: 'app-modifier-service',
  imports:  [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-service.html',
  styleUrl: './modifier-service.scss',
})
export class ModifierService {
  private router = inject(Router);
  restaurant_id:number|null
  formData!: FormGroup;
  user:any
    data_id=0
  constructor(private route: ActivatedRoute,private authSerivce:AuthSaasRestoService, private restaurantService:RestaurantService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.restaurant_id = this.restaurantService.getRestaurant()
    console.log('this.restaurant_id',this.restaurant_id)
    this.get_all_restaurants()

    this.get_all_societes()

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )

    this.load_data(this.data_id )
   
     this.formData = this.fb.group({
      description: ['', [, ]],
      type: ['', [Validators.required, ]],
      est_actif: [1, [Validators.required, ]],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [this.restaurant_id, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });

   
    this.formData.get('societe_id')?.valueChanges.subscribe((societeID) => {

      console.log("société choisi:", societeID);

      if (!societeID) {
        this.restaurants = this.allRestaurants;
      } else {
        this.restaurants = this.allRestaurants.filter(cat =>
          cat.societe_id === societeID
        );
      }

      // 🔥 reset catégorie sélectionnée
      this.formData.patchValue({ restaurant_id: null });

    });

  }



  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
   
    console.log(this.formData.value);
   
    this.crudSaasService.updateService(this.data_id,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/services/liste-services']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la modification","Echec")
      }
    });


    // appel API ici
  }

 


  restaurants:any[]
  allRestaurants:any[]
   societes:any[]

  get_all_restaurants(){

    
      this.crudSaasService.getRestaurants(this.restaurant_id).subscribe({
        next: (res) => {
          this.restaurants=res
          this.allRestaurants=res
          console.log("getRestaurants",this.restaurants)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
  }

   get_all_societes(){
      this.crudSaasService.getSocietes().subscribe({
        next: (res) => {
          this.societes=res
          console.log("getSocietes",this.societes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des sociétés","Echec")
        }
      });
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

    // autre société
    if (societeUser !== societeRestaurant) {
      this.notificationsService.error(
        "Vous ne pouvez pas modifier un service d'une autre société",
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
          "Vous ne pouvez pas modifier ce service",
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

    this.crudSaasService.getServiceById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)
        this.verifier_roles_et_societes(this.user,this.data)
        this.formData = this.fb.group({
          description: [this.data.description, [, ]],
          type: [this.data.type, [Validators.required, ]],
          est_actif: [this.data.type, [Validators.required, ]],
          societe_id: [this.data.societe_id, Validators.required],
          restaurant_id: [this.data.restaurant_id, Validators.required],
          utilisateur_id: [this.data.utilisateur_id, Validators.required],
        });

        
      },
      error: (err) => {
       if (err.status === 404) {
        this.notificationsService.error("Service introuvable", "Echec");
      } else if (err.status === 400) {
        this.notificationsService.error("ID de service invalide", "Echec");
      } else {
        this.notificationsService.error("Erreur lors de la récupération", "Echec");
      }
      this.router.navigate(['/services/liste-services']);
      }
    });

  }

  types = [
      { key: 'Midi', },
      { key: 'Soir',  },
      { key: 'Évenement', },
    ];

}
