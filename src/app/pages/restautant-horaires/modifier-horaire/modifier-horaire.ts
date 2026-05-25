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
      heure_debut: ['', [Validators.required, ]],
      heure_fin: ['', [Validators.required, ]],
      societe_id: [0, [Validators.required]],
      restaurant_id: [0, Validators.required],
      utilisateur_id: [0, Validators.required],
    });
  }



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
  

  get_heures(){
    let res= Array.from({ length: 24 }, (_, i) => {
      const heure = i.toString().padStart(2, '0') + ':00';
      return {
        position: i + 1,
        label: heure
      };
    });
    return res
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
          heure_debut: [this.data.heure_debut, [Validators.required, ]],
          heure_fin: [this.data.heure_fin, [Validators.required, ]],
          societe_id: [this.data.societe_id, [Validators.required]],
          restaurant_id: [this.data.restaurant_id, Validators.required],
          utilisateur_id: [this.data.utilisateur_id, Validators.required],


          
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
