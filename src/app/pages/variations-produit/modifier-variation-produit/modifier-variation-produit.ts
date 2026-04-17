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
  selector: 'app-modifier-variation-produit',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-variation-produit.html',
  styleUrl: './modifier-variation-produit.scss',
})
export class ModifierVariationProduit {
private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  user:any
  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService,private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.get_all_variations()
    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');

   this.load_data()

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
   
    this.formData = this.fb.group({
      produit_id:[0, Validators.required],
      titre:['', Validators.required],
      description:['', ],
      supplement_prix:[0, ],
      stock: [0, ],
      categorie_id: [null, Validators.required],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [this.user.datas.Restaurants[0]?.id, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });
  }


  onSubmit() {
    
    if (this.formData.invalid) {
      console.log(this.formData.value);
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    const finalFormData = this.formData.value;


    console.log(finalFormData);
   
    this.crudSaasService.updateVariationProduit(this.data_id,finalFormData).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/variations-produit/liste-variations-produit']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la modification","Echec")
      }
    });


    // appel API ici
  }

  
  data:any


  load_data(){

    this.crudSaasService.getVariationProduitById(this.data_id).subscribe({
      next: (res) => {
        this.data=res
        this.load_parent_data(this.data.produit_id)

        this.formData = this.fb.group({
          produit_id:[this.data.produit_id, Validators.required],
          titre:[this.data.titre, Validators.required],
          description:[this.data.description, ],
          supplement_prix:[this.data.supplement_prix, ],
          stock: [this.data.stock, ],
          categorie_id: [this.data.categorie_id, Validators.required],
          societe_id: [this.data.societe_id, Validators.required],
          restaurant_id: [this.data.restaurant_id, Validators.required],
          utilisateur_id: [this.data.utilisateur_id, ],
        });

      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

  }

  parent_data:any

  load_parent_data(parent_id:number){
    this.crudSaasService.getProduitById(parent_id).subscribe({
      next: (res) => {
        this.parent_data=res
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

  }

  categories_variations:any


  get_all_variations(){

    let restaurant_id = this.restaurantService.getRestaurant()
    this.crudSaasService.getCategorieVariations(restaurant_id).subscribe({
      next: (res) => {
        this.categories_variations=(res);
        console.log("categories_variations",this.categories_variations)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des catégories","Echec")
      }
    });
  }

}


