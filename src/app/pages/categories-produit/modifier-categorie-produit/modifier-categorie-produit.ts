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
  selector: 'app-modifier-categorie-produit',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-categorie-produit.html',
  styleUrl: './modifier-categorie-produit.scss',
})
export class ModifierCategorieProduit {
  private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  user:any
  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService,private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )

    this.get_all_societes()
    this.get_all_restaurants()

     this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
    this.load_data(this.data_id )
   
    this.formData = this.fb.group({
      titre: ['', Validators.required],
      description: ['', ],
      est_actif: [true, Validators.required],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [this.user.datas.Restaurants[0]?.id, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });
  }

  
  verifier_roles_et_societes(user:any,currentData:any){
    console.log('user',user)
    console.log('currentData',currentData)
    let societeUser = user.datas.societe_id
    let societeCurrentData = currentData.societe_id
    if(societeUser!=societeCurrentData){
      console.log(societeUser,societeCurrentData)
      this.notificationsService.error("Vous ne faites pas parti de la même société","Echec")
      this.router.navigate(['/dashboard/default']);
    }

  }


  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    console.log(this.formData.value);
    this.crudSaasService.updateCategorieProduit(this.data_id,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/categories-produit/liste-categories-produit']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la modification","Echec")
      }
    });

    // appel API ici
  }


  
  data:any

  load_data(id:number){

    this.crudSaasService.getCategorieProduitById(id).subscribe({
      next: (res) => {
        this.data=res
        this.verifier_roles_et_societes(this.user,this.data)
        this.formData = this.fb.group({
          titre: [this.data.titre, Validators.required],
          description: [this.data.description, ],
          est_actif: [this.data.est_actif, Validators.required],
          societe_id: [this.data.societe_id, Validators.required],
          restaurant_id: [this.data.restaurant_id, Validators.required],
          utilisateur_id: [this.user.datas.id, Validators.required],
        });

         this.restaurants = this.allRestaurants.filter(cat =>
          cat.societe_id === this.data.societe_id
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

          // 🔥 reset catégorie sélectionnée
          this.formData.patchValue({ restaurant_id: null });

        });
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

  }


  
  allRestaurants:any[]
  restaurants:any[]
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