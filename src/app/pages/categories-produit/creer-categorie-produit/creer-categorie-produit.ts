import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RestaurantService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-creer-categorie-produit',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './creer-categorie-produit.html',
  styleUrl: './creer-categorie-produit.scss',
})
export class CreerCategorieProduit {
  private router = inject(Router);
  formData!: FormGroup;
  user:any
  restaurant_id:number|null

  constructor(private authSerivce:AuthSaasRestoService, private restaurantService:RestaurantService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.restaurant_id = this.restaurantService.getRestaurant()
    console.log('this.restaurant_id',this.restaurant_id)
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )

    this.get_all_restaurants()
    this.get_all_societes()
   
    this.formData = this.fb.group({
      titre: ['', Validators.required],
      description: ['', ],
      ordre: [, [Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(100)]],
      est_actif: [true, Validators.required],
      societe_id: [this.user.datas?.societe_id, Validators.required],
      restaurant_id: [this.restaurant_id, Validators.required],
      utilisateur_id: [this.user.datas?.id, Validators.required],
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
      console.log(this.formData.value);
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    console.log(this.formData.value);
    this.crudSaasService.ajouterCategorieProduit(this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été crée',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/categories-produit/liste-categories-produit']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de l’ajout","Echec")
      }
    });


    // appel API ici
  }

  
restaurants:any[]
  allRestaurants:any[]
   societes:any[]

  get_all_restaurants(){

    let restaurant_id = this.restaurantService.getRestaurant()
      this.crudSaasService.getRestaurants(restaurant_id).subscribe({
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

}
