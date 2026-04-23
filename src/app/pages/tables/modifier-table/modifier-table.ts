import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';

@Component({
  selector: 'app-modifier-table',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './modifier-table.html',
  styleUrl: './modifier-table.scss',
})
export class ModifierTable {
  
  private router = inject(Router);
  formData!: FormGroup;
  data_id=0
  user:any
  constructor(private route: ActivatedRoute, private authSerivce: AuthSaasRestoService, private fb: FormBuilder,private restaurantService: RestaurantService, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

     this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
     
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )

     this.get_all_restaurants()

    this.get_all_societes()

    this.get_all_zones()

    this.load_data(this.data_id )
    
    this.formData = this.fb.group({
      numero: ['', Validators.required],
      nb_places: [2, [Validators.min(2),Validators.max(50)]],
      statut: ['libre', Validators.required],
      zone_id: [0, [Validators.required, ]],
      societe_id: [0, [Validators.required, ]],
      restaurant_id: [0, [Validators.required, ]],
    });
  }

    statuts = [
    { key: 'occupée', name: 'Occupée' },
    { key: 'libre', name: 'Libre' },
    { key: 'réservée', name: 'Réservée' },
  ];

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
        "Vous ne pouvez pas modifier une table d'une autre société",
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

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

   

    console.log(this.formData.value);

     this.crudSaasService.updateTable(this.data_id,this.formData.value).subscribe({
          next: (res) => {
            Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'L\'élément a bien été modifié',
                  showConfirmButton: false,
                });
            setTimeout(() => {
              this.router.navigate(['/tables/liste-tables']);
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
        this.allZones=res
        this.zones_restaurant=res
        console.log("zones_restaurant",this.zones_restaurant)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des catégories","Echec")
      }
    });
  }

    
  data:any

  load_data(id:number){

    this.crudSaasService.getTableById(id).subscribe({
      next: (res) => {
        this.data=res
        this.verifier_roles_et_societes(this.user,this.data)
        this.formData = this.fb.group({
          numero: [this.data.numero, Validators.required],
          nb_places: [this.data.nb_places, [Validators.min(2),Validators.max(50)]],
          statut: [this.data.statut, Validators.required],
          zone_id: [this.data.zone_id, [Validators.required, ]],
          societe_id: [this.data.societe_id, [Validators.required, ]],
          restaurant_id: [this.data.restaurant_id, [Validators.required, ]],
        });

        this.zones_restaurant = this.allZones.filter(rest =>
              rest.restaurant_id === this.data.restaurant_id
            );

        this.restaurants = this.allRestaurants?.filter(cat =>
          cat.societe_id === this.data.societe_id
        );
        this.zones_restaurant = this.allZones?.filter(rest =>
          rest.restaurant_id === this.data.restaurant_id
        );

        this.formData.get('societe_id')?.valueChanges.subscribe((societeID) => {

          console.log("société choisi:", societeID);

          if (!societeID) {
            this.restaurants = this.allRestaurants;
          } else {
            this.restaurants = this.allRestaurants.filter(cat =>
              cat.societe_id === societeID
            );
          }

          //  reset catégorie sélectionnée
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

      },
      error: (err) => {
        if (err.status === 404) {
        this.notificationsService.error("table introuvable", "Echec");
      } else if (err.status === 400) {
        this.notificationsService.error("ID table invalide", "Echec");
      } else {
        this.notificationsService.error("Erreur lors de la récupération", "Echec");
      }
      this.router.navigate(['/tables/liste-tables']);
    }
    });

  }


}
