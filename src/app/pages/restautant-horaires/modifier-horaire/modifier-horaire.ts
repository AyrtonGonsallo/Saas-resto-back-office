import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { environment } from '../../../environment';


@Component({
  selector: 'app-modifier-horaire',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './modifier-horaire.html',
  styleUrl: './modifier-horaire.scss',
})
export class ModifierHoraire {
  
  private router = inject(Router);
  public imagesUrl = environment.imagesUrl
  formData!: FormGroup;
  user:any;
  minDate: NgbDateStruct;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private restaurantService: RestaurantService, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  data_id=0
  restaurant_id:number|null
  societe_id:number|null


  ngOnInit(): void {

     this.restaurant_id = this.restaurantService.getRestaurant()
    console.log('this.restaurant_id',this.restaurant_id)

     const today = new Date();
     this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };


    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
     this.load_data(this.data_id )

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
  }

  jours = [
    { valeur: 'Lundi',  },
    { valeur: 'Mardi',  },
    { valeur: 'Mercredi',  },
    { valeur: 'Jeudi', },
    { valeur: 'Vendredi',  },
    { valeur: 'Samedi',  },
    { valeur: 'Dimanche',  },
  ]



  verifier_roles_et_societes(user: any, currentRestaurant: any) {
    console.log('user', user);
    console.log('restaurant', currentRestaurant);

    const prioriteRoleUser = user?.datas?.Role?.priorite;
    const societeUser = user?.datas?.societe_id;

    const societeRestaurant = currentRestaurant?.societe_id;
    const restaurantId = currentRestaurant?.id;

    const restaurantsAutorises =
      user?.datas?.Restaurants?.map((r: any) => r.id) || [];

    // super admin
    if (prioriteRoleUser === 1) return;

    // autre société
    if (societeUser !== societeRestaurant) {
      this.notificationsService.error(
        "Vous ne pouvez pas modifier un restaurant d'une autre société",
        "Echec"
      );
      this.router.navigate(['/dashboard/default']);
      return;
    }

    // les clients employes ...
    if (prioriteRoleUser >= 5) {
      const canAccess = restaurantsAutorises.includes(restaurantId);

      if (!canAccess) {
        this.notificationsService.error(
          "Vous ne pouvez pas modifier ce restaurant",
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
 

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

  

    console.log('finalFormData',this.formData.value);

     this.crudSaasService.update_horaire(this.data_id,this.formData.value).subscribe({
          next: (res) => {
            Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'L\'élément a bien été modifié',
                  showConfirmButton: false,
                });
            setTimeout(() => {
              this.router.navigate(['/horaires/liste-horaires']);
            }, 2000);
          },
          error: (err) => {
            this.notificationsService.error("Erreur lors de la modification","Echec")
          }
        });


    // appel API ici
  }

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

  types = [
    { key: 'Réservation', },
    { key: 'Click and collect',  },
  ];
  
  data:any


    load_data(id:number){

      this.crudSaasService.get_horaire_by_id(id).subscribe({
        next: (res) => {
          this.data=res
          const user = this.restaurantService.getUser();
          this.verifier_roles_et_societes(user, this.data);
        
          this.formData = this.fb.group({

            type: [this.data.type, Validators.required],
            jour: [this.data.jour, Validators.required],
            heure_debut: [this.data.heure_debut, this.data.ferme  ? [] : [Validators.required]],
            heure_fin: [this.data.heure_fin, this.data.ferme  ? [] : [Validators.required]],
            societe_id: [this.data.societe_id, [Validators.required]],
            restaurant_id: [this.data.restaurant_id, Validators.required],
            utilisateur_id: [this.data.utilisateur_id, Validators.required],
            service_id: [this.data.service_id, Validators.required],
            ferme: [this.data.ferme, Validators.required],

          });

          this.restaurant_id = this.data.restaurant_id
          this.get_all_services()


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

          
        },
        error: (err) => {
          if (err.status === 404) {
          this.notificationsService.error("Restaurant introuvable", "Echec");
        } else if (err.status === 400) {
          this.notificationsService.error("ID restaurant invalide", "Echec");
        } else {
          this.notificationsService.error("Erreur lors de la récupération", "Echec");
        }
        this.router.navigate(['horaires/liste-horaires']);
        }
      });

    }




 
    




}
