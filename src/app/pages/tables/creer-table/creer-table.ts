import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/restaurant/restaurant.service';

@Component({
  selector: 'app-creer-table',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './creer-table.html',
  styleUrl: './creer-table.scss',
})
export class CreerTable {
  
  private router = inject(Router);
  formData!: FormGroup;
  constructor(private fb: FormBuilder, private crudSaasService:CrudSaasRestoService,private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

     this.get_all_restaurants()

    this.get_all_societes()
    
    this.formData = this.fb.group({
      numero: ['', Validators.required],
      nb_places: [1, ],
      statut: ['libre', Validators.required],
      societe_id: [0, [Validators.required, ]],
      restaurant_id: [0, [Validators.required, ]],
    });
  }

  statuts = [
    { key: 'occupée', name: 'Occupée' },
    { key: 'libre', name: 'Libre' },
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
            this.notificationsService.error("Erreur lors de l’ajout","Echec")
          }
        });


    // appel API ici
  }

restaurants:any[]
societes:any[]

  get_all_restaurants(){

    let restaurant_id = this.restaurantService.getRestaurant()
      this.crudSaasService.getRestaurants(restaurant_id).subscribe({
        next: (res) => {
          this.restaurants=res
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
