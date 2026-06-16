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
import { types,unites_de_temps,types_de_valeur,options_moyens_contact  } from '../../../shared/constants/types-parametres';

@Component({
  selector: 'app-modifier-parametre',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-parametre.html',
  styleUrl: './modifier-parametre.scss',
})
export class ModifierParametre {
  private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  user:any
   hide_value=true
  hide_unite=true
  hide_contact=true
  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService,private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

   

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )

    this.get_all_societes()

    this.get_all_restaurants()

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
    
   
    this.formData = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      type_de_valeur: ['montant', Validators.required],
      valeurs_options: ['', ],
      unite_de_temps: ['', ],
      valeur: ['', Validators.required],
      description: ['', ],
      est_actif: [true, Validators.required],
      est_important: [false, Validators.required],
      societe_id: [this.user.datas?.societe_id, Validators.required],
      restaurant_id: [this.user.datas.Restaurants[0]?.id, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });

    
  }


  prioriteRoleUser=0
   verifier_roles_et_societes(user: any, currentData: any) {
    const prioriteRoleUser = user?.datas?.Role?.priorite;
    const societeUser = user?.datas?.societe_id;
    const societeCurrentData = currentData?.societe_id;
    const restaurantCurrentData = currentData?.restaurant_id;
    this.prioriteRoleUser=prioriteRoleUser
    const restaurantsAutorises =
      user?.datas?.Restaurants?.map((r: any) => r.id) || [];

    // super admin → accès total
    if (prioriteRoleUser === 1) return;

    // société différente
    if (societeUser !== societeCurrentData) {
      this.notificationsService.error(
        "Vous ne pouvez pas modifier un paramètre d'une autre société",
        "Echec"
      );
      this.router.navigate(['/dashboard/default']);
      return;
    }

    // gestionnaire restaurant → seulement ses restaurants
    if (prioriteRoleUser === 4) {
      const canAccess =
        restaurantsAutorises.includes(restaurantCurrentData);

      if (!canAccess) {
        this.notificationsService.error(
          "Vous ne pouvez pas modifier ce paramètre",
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
      console.log(this.formData)
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
   
    console.log(this.formData.value);
   
    this.crudSaasService.updateParametre(this.data_id,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/parametres/liste-parametres']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la miodification","Echec")
      }
    });


    // appel API ici
  }




    types = types;
    unites_de_temps = unites_de_temps
    types_de_valeur = types_de_valeur
    options_moyens_contact = options_moyens_contact

    selectedFile: File | null = null;

    onFileSelected(event: any) {
      
      this.selectedFile = event.target.files[0];
      console.log("upload",this.selectedFile)
      if (this.selectedFile) {
        this.formData.patchValue({
          valeur: this.selectedFile.name
        });
      }
    }


  
   data:any
is_status=false

  load_data(id:number){

    this.crudSaasService.getParametreById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)
        this.verifier_roles_et_societes(this.user, this.data);
       
        this.formData = this.fb.group({
          titre: [this.data.titre, Validators.required],
          type: [this.data.type, Validators.required],
          valeur: [this.data.valeur,  this.data.type_de_valeur === 'statut' ? [] : [Validators.required]],
          type_de_valeur: [this.data.type_de_valeur, Validators.required],
          valeurs_options: [this.data.valeurs_options, ],
          unite_de_temps: [this.data.unite_de_temps, ],
          description: [this.data.description, ],
          est_actif: [this.data.est_actif, Validators.required],
          est_important: [this.data.est_important, Validators.required],
          societe_id: [this.data.societe_id, Validators.required],
          restaurant_id: [this.data.restaurant_id, Validators.required],
          utilisateur_id: [this.data.utilisateur_id, Validators.required],
        });
        const valeurControl = this.formData.get('valeur');

        this.formData.get('type')?.valueChanges.subscribe((type) => {
          let typelabel = this.getTypeName(type);

          console.log("type choisi:", typelabel);
          //  reset catégorie sélectionnée
          this.formData.patchValue({ titre: typelabel });

        });

        if(this.data.type_de_valeur=='statut'){
          this.hide_value=true
          valeurControl?.clearValidators();
          this.is_status=true
        }else{
          valeurControl?.setValidators([Validators.required]);
          if(this.data.type_de_valeur!='choix_d_options'){
            this.hide_contact=true
            this.hide_value=false
          }else{
            this.hide_contact=false
            this.hide_value=true
          }
        }
        valeurControl?.updateValueAndValidity();
        
        if(this.data.type_de_valeur!='unite_temporelle'){
          this.hide_unite=true
        }else{
          this.hide_unite=false
        }

        this.formData.get('type_de_valeur')?.valueChanges.subscribe((type_de_valeur) => {
      
          //'unité temporelle','statut','montant','pourcentage','coefficient'
          console.log("type_de_valeur choisie et clear:", type_de_valeur);
          if(type_de_valeur=='statut'){
            this.hide_value=true
            valeurControl?.clearValidators();
          }else{
            valeurControl?.setValidators([Validators.required]);
            if(type_de_valeur!='choix_d_options'){
              this.hide_contact=true
              this.hide_value=false
            }else{
              this.hide_contact=false
              this.hide_value=true
            }
          }
          valeurControl?.updateValueAndValidity();
          if(type_de_valeur!='unite_temporelle'){
            this.hide_unite=true
          }else{
            this.hide_unite=false
          }

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
        if (err.status === 404) {
        this.notificationsService.error("parametre introuvable", "Echec");
      } else if (err.status === 400) {
        this.notificationsService.error("ID parametre invalide", "Echec");
      } else {
        this.notificationsService.error("Erreur lors de la récupération", "Echec");
      }
      this.router.navigate(['/parametres/liste-parametres']);
      }
    });
  }

    getTypeName(key: string): string {
      const found = this.types.find(t => t.key === key);
      return found ? found.name : key;
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

          this.load_data(this.data_id )
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