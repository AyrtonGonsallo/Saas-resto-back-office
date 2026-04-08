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
import { environment } from '../../../environment';
import { RestaurantService } from '../../../shared/services/user/user.service';


@Component({
  selector: 'app-modifier-produit',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-produit.html',
  styleUrl: './modifier-produit.scss',
})
export class ModifierProduit {
  public imagesUrl = environment.imagesUrl
  previewNewimageUrl: any = null;
  private router = inject(Router);
  data_id=0
  
  formData!: FormGroup;
  user:any
  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService, private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
    this.get_categories()
    this.get_all_societes()
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
  }


  onSubmit() {
    
    if (this.formData.invalid) {
      console.log("invalide",this.formData.value)
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
   
    this.crudSaasService.updateProduit(this.data_id,finalFormData).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/produits/liste-produits']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la modification","Echec")
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
        this.categories_produits=res.filter(cat => cat.est_actif === true);
        this.allCategories=res.filter(cat => cat.est_actif === true);
        console.log("categories_produits",this.categories_produits)
        this.load_data(this.data_id )
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des catégories","Echec")
      }
    });
  }

  restaurants:any[]
  allRestaurants:any[]
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

   statuts = [
    { key: 'disponible', name: 'Disponible' },
    { key: 'indisponible', name: 'Indisponible' },
  ];

  previewUrl : any = null;
  selectedFile: File | null = null;
  maxSize = 2 * 1024 * 1024;
  onFileSelected(event: any) {
    
    this.selectedFile = event.target.files[0];
    let filesize = this.selectedFile?.size??0
    if (filesize > this.maxSize) {
      alert('Fichier trop volumineux (max 2MB)');
      return;
    }
    console.log("upload",this.selectedFile)
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  isZoomed = false;

  openZoom() {
    this.isZoomed = true;
  }

  closeZoom() {
    this.isZoomed = false;
  }

  
   data:any


  load_data(id:number){

    this.crudSaasService.getProduitById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)
        this.previewUrl = this.imagesUrl+this.data?.image
        
        this.categories_produits = this.allCategories.filter(cat =>
          cat.restaurant_id === this.data.restaurant_id
        );
      

        this.formData = this.fb.group({
          titre: [this.data.titre, Validators.required],
          categorie_id: [this.data.categorie_id, Validators.required],
          image: ['', ],
          description: [this.data.description, ],
          allergenes: [this.data.allergenes, ],
          actif: [this.data.actif, Validators.required],
          prix_ht: [this.data.prix_ht, ],
          tva: [this.data.tva, ],
          statut: [this.data.statut, Validators.required],
          stock: [this.data.stock],
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

  redirect_add_variation(){
    let produit_id = this.data_id
    this.router.navigate(['/variations-produit/creer-variation-produit', produit_id]);
  }

}

