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
import { types } from '../../../shared/constants/types-parametres';

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
      type: ['', Validators.required],
      valeur: ['', Validators.required],
      description: ['', ],
      est_actif: [true, Validators.required],
      est_important: [false, Validators.required],
      societe_id: [this.user.datas?.societe_id, Validators.required],
      restaurant_id: [this.user.datas.Restaurants[0]?.id, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });

    
  }

   verifier_roles_et_societes(user: any, currentData: any) {
    const prioriteRoleUser = user?.datas?.Role?.priorite;
    const societeUser = user?.datas?.societe_id;
    const societeCurrentData = currentData?.societe_id;
    const restaurantCurrentData = currentData?.restaurant_id;

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
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    const finalFormData = new FormData();

    finalFormData.append('titre', this.formData.value.titre);
    finalFormData.append('type', this.formData.value.type);
    finalFormData.append('description', this.formData.value.description);
    finalFormData.append('valeur', this.formData.value.valeur);
    finalFormData.append('est_actif', this.formData.value.est_actif);
    finalFormData.append('est_important', this.formData.value.est_important);
   
    finalFormData.append('societe_id', this.formData.value.societe_id);
    finalFormData.append('restaurant_id', this.formData.value.restaurant_id);
    finalFormData.append('utilisateur_id', this.formData.value.utilisateur_id);

    // 🔥 fichier image
    if (this.selectedFile) {
      console.log("image envoyee",this.selectedFile)
      finalFormData.append('image', this.selectedFile);
    }

    console.log(finalFormData);
   
    this.crudSaasService.updateParametre(this.data_id,finalFormData).subscribe({
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


  load_data(id:number){

    this.crudSaasService.getParametreById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)
        this.verifier_roles_et_societes(this.user, this.data);
       
        this.formData = this.fb.group({
          titre: [this.data.titre, Validators.required],
          type: [this.data.type, Validators.required],
          valeur: [this.data.valeur, Validators.required],
          description: [this.data.description, ],
          est_actif: [this.data.est_actif, Validators.required],
          est_important: [this.data.est_important, Validators.required],
          societe_id: [this.data.societe_id, Validators.required],
          restaurant_id: [this.data.restaurant_id, Validators.required],
          utilisateur_id: [this.data.utilisateur_id, Validators.required],
        });

        this.formData.get('type')?.valueChanges.subscribe((type) => {
          let typelabel = this.getTypeName(type);

          console.log("type choisi:", typelabel);
          //  reset catégorie sélectionnée
          this.formData.patchValue({ titre: typelabel });

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