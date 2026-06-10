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


@Component({
  selector: 'app-ajouter-horaire',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule, ],
  templateUrl: './ajouter-horaire.html',
  styleUrl: './ajouter-horaire.scss',
})
export class AjouterHoraire {

  
  private router = inject(Router);
  formData!: FormGroup;
  constructor(private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}

  


  ngOnInit(): void {

    this.get_all_societes()
    this.get_all_restaurants()
    
    this.formData = this.fb.group({
      type: ['', Validators.required],
      jour: ['', Validators.required],
      ferme: [false, Validators.required],
      service_id: [0, Validators.required],
      heure_debut: ['', [Validators.required, ]],
      heure_fin: ['', [Validators.required, ]],
      societe_id: [0, [Validators.required]],
      restaurant_id: [0, Validators.required],
      utilisateur_id: [0, Validators.required],
    });

    this.formData.get('societe_id')?.valueChanges.subscribe((societeID) => {

      this.societe_id = societeID
      console.log("société choisi:", this.societe_id);
      if (!this.societe_id) {
        this.restaurants = this.allRestaurants;
      } else {
        this.restaurants = this.allRestaurants.filter(resto =>
          resto.societe_id === this.societe_id
        );
      }
      // remettre resto a null
      this.formData.patchValue({ restaurant_id: null });

    });

    this.formData.get('restaurant_id')?.valueChanges.subscribe((restaurantID) => {

      this.restaurant_id = restaurantID
      console.log("restaurant choisi:", this.restaurant_id);
      if(this.restaurant_id ){
        this.get_all_services()
      }
      // remettre service a null
      this.formData.patchValue({ service_id: null });

    });


    this.formData.get('ferme')?.valueChanges.subscribe((ferme) => {
      const heureDebut = this.formData.get('heure_debut');
      const heureFin = this.formData.get('heure_fin');

      if (ferme) {
        heureDebut?.clearValidators();
        heureFin?.clearValidators();

        // Optionnel : vider les champs
        heureDebut?.setValue('');
        heureFin?.setValue('');
      } else {
        heureDebut?.setValidators([Validators.required]);
        heureFin?.setValidators([Validators.required]);
      }

      heureDebut?.updateValueAndValidity();
      heureFin?.updateValueAndValidity();
    });


  }

  types = [
    { key: 'Réservation', },
    { key: 'Click and collect',  },
  ];
 

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

    console.log(this.formData.value);

    this.crudSaasService.ajouter_horaire(this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été crée',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/horaires/liste-horaires']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de l’ajout","Echec")
      }
    });
    // appel API ici
  }

  societe_id=0
  restaurant_id=0
  societes:any[]
  restaurants:any[]
  allRestaurants:any[]
  services:any[]
  allServices:any[]


  get_all_services(){


    let restaurant_id = this.restaurant_id

    this.crudSaasService.getServicesbyRestoId(restaurant_id).subscribe({
      next: (res) => {
        this.services = res
        this.allServices = res

        console.log("getServicesbyRestoId",this.allServices)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des allServices","Echec")
      }
    });
  }

  
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
        console.log("societes",this.societes)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des sociétés","Echec")
      }
    });
  }


  

  get_heures() {
  return Array.from({ length: 96 }, (_, i) => {
    const heures = Math.floor(i / 4)
      .toString()
      .padStart(2, '0');

    const minutes = ((i % 4) * 15)
      .toString()
      .padStart(2, '0');

    return {
      position: i + 1,
      label: `${heures}:${minutes}`
    };
  });
}


  heures_deb = this.get_heures()

  heures_fin = this.get_heures()



}

