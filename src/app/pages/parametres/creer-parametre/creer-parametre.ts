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
import { types } from '../../../shared/constants/types-parametres';

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
      valeur: ['', Validators.required],
      description: ['', ],
      est_actif: [true, Validators.required],
      est_important: [false, Validators.required],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [this.restaurant_id, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
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


   types = types

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

