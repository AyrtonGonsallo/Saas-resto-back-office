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
import { RestaurantService } from '../../../shared/services/restaurant/restaurant.service';

@Component({
  selector: 'app-creer-parametre',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './creer-parametre.html',
  styleUrl: './creer-parametre.scss',
})
export class CreerParametre {
   private router = inject(Router);
  
  formData!: FormGroup;
  user:any
  constructor(private authSerivce:AuthSaasRestoService, private restaurantService:RestaurantService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.get_all_restaurants()

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
   
    this.formData = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      valeur: ['', Validators.required],
      description: ['', ],
      est_actif: [true, Validators.required],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [this.user.datas.Restaurants[0].id, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });

    this.formData.get('type')?.valueChanges.subscribe((type) => {
      let typelabel = this.getTypeName(type);

      console.log("type choisi:", typelabel);

    
      //  reset catégorie sélectionnée
      this.formData.patchValue({ titre: typelabel });

    });

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
   
    finalFormData.append('societe_id', this.formData.value.societe_id);
    finalFormData.append('restaurant_id', this.formData.value.restaurant_id);
    finalFormData.append('utilisateur_id', this.formData.value.utilisateur_id);

    // 🔥 fichier image
    if (this.selectedFile) {
      console.log("image envoyee",this.selectedFile)
      finalFormData.append('image', this.selectedFile);
    }

    console.log(finalFormData);
   
    this.crudSaasService.ajouterParametre(finalFormData).subscribe({
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


   types = [
    { key: 'tva', name: 'Tva' },
    { key: 'coefficient', name: 'Coefficient' },
    { key: 'max_commandes_par_minutes', name: 'Max commandes par minute' },
    { key: 'alerte_stocke_min', name: 'Stocke minimun avant alerte' },
    //{ key: 'logo', name: 'Logo' },
    //{ key: 'couleur_principale', name: 'Couleur principale' },
    //{ key: 'couleur_secondaire', name: 'Couleur secondaire' },
  ];

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

  getTypeName(key: string): string {
    const found = this.types.find(t => t.key === key);
    return found ? found.name : key;
  }
  
  restaurants:any[]

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

}

