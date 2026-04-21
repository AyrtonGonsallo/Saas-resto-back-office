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
  selector: 'app-modifier-commande',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-commande.html',
  styleUrl: './modifier-commande.scss',
})
export class ModifierCommande {
   private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  user:any
  constructor(private route: ActivatedRoute, private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
  
    this.load_data(this.data_id)
    
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
   
    this.formData = this.fb.group({
     
      date_retrait: [null, [Validators.required ]], //etape 3
      heure_retrait: [null, [Validators.required ]], //etape 3
      statut: ['En attente', []], //etape 3
      
    });
  }


  onSubmit() {
    
    if (this.formData.invalid) {
      console.log("invalide",this.formData.value)
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    
    console.log(this.formData.value);
   
    this.crudSaasService.updateCommande(this.data_id,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/commandes/liste-commandes']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error(err.error.message,"Echec")
      }
    });
    // appel API ici
  }

   statuts = [
    { key: 'Nouvelle'},
    { key: 'En préparation'},
    { key: 'Prête'},
    { key: 'Retirée'},
    { key: 'Annulée'},
  ];
  
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
        "Vous ne pouvez pas modifier une commande d'une autre société",
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
          "Vous ne pouvez pas modifier cette commande",
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

    this.crudSaasService.getCommandeById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)
        this.verifier_roles_et_societes(this.user,this.data)
       
        const date_retrait = new Date(this.data.date_retrait);

        const localDateReservation = new Date(
          date_retrait.getUTCFullYear(),
          date_retrait.getUTCMonth(),
          date_retrait.getUTCDate(),
          date_retrait.getUTCHours(),
          date_retrait.getUTCMinutes()
        );

        console.log("localDateReservation",localDateReservation)

        this.formData = this.fb.group({
     
          date_retrait: [null, [Validators.required ]], //etape 3
          heure_retrait: [null, [Validators.required ]], //etape 3
          statut: [this.data.statut, []], //etape 3
          
        });

        

        this.formData.patchValue({
          date_retrait: {
            year: localDateReservation.getFullYear(),
            month: localDateReservation.getMonth() + 1,
            day: localDateReservation.getDate()
          },
          heure_retrait: {
            hour: localDateReservation.getHours(),
            minute: localDateReservation.getMinutes()
          }
        });

        
      },
      error: (err) => {
        if (err.status === 404) {
        this.notificationsService.error("Produit introuvable", "Echec");
      } else if (err.status === 400) {
        this.notificationsService.error("ID de produit invalide", "Echec");
      } else {
        this.notificationsService.error("Erreur lors de la récupération", "Echec");
      }
      this.router.navigate(['/commandes/liste-commandes']);
      }
    });

  }

    societeData:any

  
  
   

}
