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
import { types,unites_de_temps,types_de_valeur,options_moyens_contact,options_jours, options_heure } from '../../../shared/constants/types-parametres';

@Component({
  selector: 'app-creer-parametre',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './creer-parametre.html',
  styleUrl: './creer-parametre.scss',
})
export class CreerParametre {
  private router = inject(Router);
  restaurant_id:number|null
  formData!: FormGroup;
  user:any
  hide_value=true
  hide_unite=true
   hide_heures_jours=true
  hide_contact=true
  constructor(private authSerivce:AuthSaasRestoService, private restaurantService:RestaurantService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.restaurant_id = this.restaurantService.getRestaurant()
    console.log('this.restaurant_id',this.restaurant_id)
    this.get_all_restaurants()

    this.get_all_societes()

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
   
    this.formData = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      type_de_valeur: ['montant', Validators.required],
      valeurs_options: ['', ],
      unite_de_temps: ['', ],
      valeur: ['', Validators.required],
      day_of_week: [1, ],
      hour_of_day: ['08:00', ],
      description: ['', ],
      est_actif: [true, Validators.required],
      est_important: [false, Validators.required],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [this.restaurant_id, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });

    

    this.formData.get('type_de_valeur')?.valueChanges.subscribe((type_de_valeur) => {
      

      //'unité temporelle','statut','montant','pourcentage','coefficient'
      console.log("type_de_valeur choisie:", type_de_valeur);
      const valeurControl = this.formData.get('valeur');
      if(type_de_valeur=='statut'){
        this.hide_value=true
        valeurControl?.clearValidators();
      }else if(type_de_valeur=='jour_et_heure'){
        this.hide_value=true
        this.hide_heures_jours=false
        valeurControl?.clearValidators();
      }
      else{
        valeurControl?.setValidators([Validators.required]);
        if(type_de_valeur!='choix_d_options'){
          this.hide_contact=true
          this.hide_value=false
        }else{
          this.hide_contact=false
          this.hide_value=true
        }
      }
      if(type_de_valeur!='unite_temporelle'){
        this.hide_unite=true
      }else{
        this.hide_unite=false
      }
      valeurControl?.updateValueAndValidity();

      

    });

    this.formData.get('type')?.valueChanges.subscribe((type) => {
      let typelabel = this.getTypeName(type);

      console.log("type choisi:", typelabel);
      //  reset catégorie sélectionnée
      this.formData.patchValue({ titre: typelabel });

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
      this.notificationsService.error("Formulaire invalide","Echec")
      console.log(this.formData)
      this.formData.markAllAsTouched();
      return;
    }
   

    console.log(this.formData.value);
   
    this.crudSaasService.ajouterParametre(this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été crée',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/parametres/liste-parametres']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de l’ajout","Echec")
      }
    });


    // appel API ici
  }

  categories_parametres:any[]


  types = types
  unites_de_temps = unites_de_temps
  types_de_valeur = types_de_valeur
  options_moyens_contact = options_moyens_contact
  options_jours = options_jours 
    options_heure = options_heure 
    

  getTypeName(key: string): string {
    const found = this.types.find(t => t.key === key);
    return found ? found.name : key;
  }
  
  restaurants:any[]
  allRestaurants:any[]
   societes:any[]

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
          console.log("getSocietes",this.societes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des sociétés","Echec")
        }
      });
    }

}

