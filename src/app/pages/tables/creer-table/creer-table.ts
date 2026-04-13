import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';

@Component({
  selector: 'app-creer-table',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './creer-table.html',
  styleUrl: './creer-table.scss',
})
export class CreerTable {
  
  private router = inject(Router);
  formData!: FormGroup;
  user:any
  restaurant_id:number|null
  constructor(private authSerivce:AuthSaasRestoService, private fb: FormBuilder, private crudSaasService:CrudSaasRestoService,private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.restaurant_id = this.restaurantService.getRestaurant()
    console.log('this.restaurant_id',this.restaurant_id)
    this.get_all_restaurants()
    this.get_all_societes()
    this.get_all_zones()

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
    
    this.formData = this.fb.group({
      numero: ['', Validators.required],
      nb_places: [2, [Validators.min(2),Validators.max(50)]],
      statut: ['libre', Validators.required],
      zone_id: [0, Validators.required],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [this.restaurant_id, Validators.required],
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

    this.formData.get('restaurant_id')?.valueChanges.subscribe((restaurantID) => {

        console.log("restaurantID choisi:", restaurantID);

        if (!restaurantID) {
          this.zones_restaurant = this.allZones;
        } else {
          this.zones_restaurant = this.allZones.filter(rest =>
            rest.restaurant_id === restaurantID
          );
        }

        //  reset catégorie sélectionnée
        this.formData.patchValue({ zone_id: null });

      });
  }

  statuts = [
    { key: 'occupée', name: 'Occupée' },
    { key: 'libre', name: 'Libre' },
    { key: 'réservée', name: 'Réservée' },
  ];

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

   

    console.log(this.formData.value);

    this.crudSaasService.ajouterTable(this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été crée',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/tables/liste-tables']);
        }, 2000);
      },
      error: (err) => {
        if(err.error.message == "Validation error"){
          this.notificationsService.error("Le numéro de table existe déja dans ce restaurant","Echec")
        }else{
          this.notificationsService.error("Erreur lors de l’ajout","Echec")
        }
        
      }
    });


    // appel API ici
  }

  allRestaurants:any[]
  restaurants:any[]
  societes:any[]
  zones_restaurant:any[]
  allZones:any[]

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

   get_all_zones(){

    let restaurant_id = this.restaurantService.getRestaurant()
    this.crudSaasService.getZonesRestaurant(restaurant_id).subscribe({
      next: (res) => {
        this.zones_restaurant=res
        this.allZones = res
        console.log("zones_restaurant",this.zones_restaurant)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des catégories","Echec")
      }
    });
  }

}
