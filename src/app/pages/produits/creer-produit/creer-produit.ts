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
  selector: 'app-creer-produit',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule],
  templateUrl: './creer-produit.html',
  styleUrl: './creer-produit.scss',
})
export class CreerProduit {
  private router = inject(Router);
  
  formData!: FormGroup;
  user:any
  constructor(private authSerivce:AuthSaasRestoService, private restaurantService: RestaurantService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.get_categories()

    this.get_all_restaurants()

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
   
    this.formData = this.fb.group({
      titre: ['', Validators.required],
      categorie_id: [0, Validators.required],
      image: ['', ],
      description: ['', ],
      allergenes: ['', ],
      actif: [true, Validators.required],
      prix_ht: [0, ],
      tva: [20, ],
      statut: ['disponible', Validators.required],
      stock: [0, ],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [0, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });

    this.formData.get('restaurant_id')?.valueChanges.subscribe((restaurantId) => {

      console.log("restaurant choisi:", restaurantId);

      if (!restaurantId) {
        this.categories_produits = this.allCategories;
      } else {
        this.categories_produits = this.allCategories.filter(cat =>
          cat.restaurant_id === restaurantId
        );
      }

      // 🔥 reset catégorie sélectionnée
      this.formData.patchValue({ categorie_id: null });

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
    finalFormData.append('categorie_id', this.formData.value.categorie_id);
    finalFormData.append('description', this.formData.value.description);
    finalFormData.append('allergenes', this.formData.value.allergenes);
    finalFormData.append('actif', this.formData.value.actif);
    finalFormData.append('prix_ht', this.formData.value.prix_ht);
    finalFormData.append('tva', this.formData.value.tva);
    finalFormData.append('statut', this.formData.value.statut);
    finalFormData.append('stock', this.formData.value.stock);
    finalFormData.append('societe_id', this.formData.value.societe_id);
    finalFormData.append('restaurant_id', this.formData.value.restaurant_id);
    finalFormData.append('utilisateur_id', this.formData.value.utilisateur_id);

    // 🔥 fichier image
    if (this.selectedFile) {
      console.log("image envoyee",this.selectedFile)
      finalFormData.append('image', this.selectedFile);
    }

    console.log(finalFormData);
   
    this.crudSaasService.ajouterProduit(finalFormData).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été crée',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/produits/liste-produits']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de l’ajout","Echec")
      }
    });


    // appel API ici
  }

  allCategories: any[] = [];
categories_produits: any[] = [];

  get_categories(){

    let restaurant_id = this.restaurantService.getRestaurant()
     this.crudSaasService.getCategoriesProduit(restaurant_id).subscribe({
      next: (res) => {
        this.allCategories = res;
        this.categories_produits = res;
        console.log("categories_produits",this.categories_produits)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des catégories","Echec")
      }
    });
  }

   statuts = [
    { key: 'disponible', name: 'Disponible' },
    { key: 'indisponible', name: 'Indisponible' },
  ];

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    
    this.selectedFile = event.target.files[0];
    console.log("upload",this.selectedFile)
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

  getCatLabel(){

  }

}

