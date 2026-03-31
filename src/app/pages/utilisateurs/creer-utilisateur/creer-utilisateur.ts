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
  selector: 'app-creer-utilisateur',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './creer-utilisateur.html',
  styleUrl: './creer-utilisateur.scss',
})
export class CreerUtilisateur {
private router = inject(Router);
  formData!: FormGroup;
  constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.get_all_roles()

    this.get_all_societes()

    this.get_all_restaurants()
    
    this.formData = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      mot_de_passe: ['', Validators.required],
      confirmed_mot_de_passe: ['', Validators.required],
      role_id: [0, Validators.required],
      societe_id: [0, ],
      restaurant_id: [0, ],
    });
  }

  checkpasswords(){
    const val1 = this.formData.get('mot_de_passe')?.value;
    const val2 = this.formData.get('confirmed_mot_de_passe')?.value;

    return val1 === val2;
  }

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

    if (!this.checkpasswords()) {
      this.notificationsService.error("Les mots de passe ne correspondent pas","Echec")
      this.formData.markAllAsTouched();
      return;
    }

    console.log(this.formData.value);

     this.crudSaasService.ajouterUtilisateur(this.formData.value).subscribe({
          next: (res) => {
            Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'L\'élément a bien été crée',
                  showConfirmButton: false,
                });
            setTimeout(() => {
              this.router.navigate(['/utilisateurs/liste-utilisateurs']);
            }, 2000);
          },
          error: (err) => {
            console.log("erreur",err.error)
            this.notificationsService.error("Erreur lors de l’ajout","Echec")
          }
        });


    // appel API ici
  }

  roles:any[]
  societes:any[]
  restaurants:any[]


    get_all_societes(){
      this.crudSaasService.getSocietes().subscribe({
        next: (res) => {
          this.societes=res
          console.log("societes",this.societes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
        }
      });
    }

     get_all_restaurants(){
      let restaurant_id = this.restaurantService.getRestaurant()
      this.crudSaasService.getRestaurants(restaurant_id).subscribe({
        next: (res) => {
          this.restaurants=res
          console.log("restaurants",this.restaurants)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
    }


    get_all_roles(){
      this.crudSaasService.getRoles().subscribe({
        next: (res) => {
          this.roles=res
          console.log("roles",this.roles)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
        }
      });
    }


}

