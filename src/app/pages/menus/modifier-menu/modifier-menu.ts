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
  selector: 'app-modifier-menu',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-menu.html',
  styleUrl: './modifier-menu.scss',
})
export class ModifierMenu {
  public imagesUrl = environment.imagesUrl
  previewNewimageUrl: any = null;
  private router = inject(Router);
  data_id=0
  
  formData!: FormGroup;
  user:any
   restaurant_id:number|null
  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService, private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
    this.get_all_societes()
    this.get_all_restaurants()
    this.get_all_produits()
    
    this.restaurant_id = this.restaurantService.getRestaurant()

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
   
    this.formData = this.fb.group({
      type: ['', Validators.required],
      titre: ['', Validators.required],
      image: ['', ],
      description: ['', ],
      actif: [true, Validators.required],
      liste_produits: [[], ],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [this.restaurant_id, Validators.required],
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
    finalFormData.append('type', this.formData.value.type);
    finalFormData.append('description', this.formData.value.description);
    finalFormData.append('actif', this.formData.value.actif);
    finalFormData.append(
      'liste_produits',
      JSON.stringify(this.formData.value.liste_produits)
    );
    finalFormData.append('societe_id', this.formData.value.societe_id);
    finalFormData.append('restaurant_id', this.formData.value.restaurant_id);

    //  fichier image
    if (this.selectedFile) {
      console.log("image envoyee",this.selectedFile)
      finalFormData.append('image', this.selectedFile);
    }

    console.log('finalFormData',finalFormData);
   
    this.crudSaasService.updateMenu(this.data_id,finalFormData).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/menus/liste-menus']);
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
  produits:any[]
  allProduits:any[]


  get_all_produits(){
    
    let restaurant_id = this.restaurantService.getRestaurant()
    this.crudSaasService.getProduits(restaurant_id).subscribe({
      next: (res) => {
        this.allProduits = res.map((produit:any) => ({
          ...produit,
          fullName: produit.categorie.titre + ' - ' + produit.titre + ' - ' + produit.Restaurant.nom
        }));

        this.produits = res.map((produit:any) => ({
          ...produit,
          fullName: produit.categorie.titre + ' - ' + produit.titre + ' - ' + produit.Restaurant.nom
        }));
        console.log("produits",this.produits)
        this.load_data(this.data_id )
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des catégories","Echec")
      }
    });
  }

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

  types = [
    { key: 'Menu fixe' },
    { key: 'Menu du jour' },
    { key: 'Menu éphémère' },
    { key: 'Menu spécial' },
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

    this.crudSaasService.getMenuById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)
        this.previewUrl = this.imagesUrl+this.data?.image
        
        this.produits = this.allProduits.filter(p =>
          p.restaurant_id === this.data.restaurant_id
        );
      

      

        this.formData = this.fb.group({
          type: [this.data.type, Validators.required],
          titre: [this.data.titre, Validators.required],
          image: ['', ],
          description: [this.data.description, ],
          actif: [this.data.actif, Validators.required],
          liste_produits: [Array.isArray(this.data.produits) 
            ? this.data.produits.map((p:any) => p.id) 
            : [Validators.required]
          ],
          societe_id: [this.data.societe_id, Validators.required],
          restaurant_id: [this.data.restaurant_id, Validators.required],
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



}


