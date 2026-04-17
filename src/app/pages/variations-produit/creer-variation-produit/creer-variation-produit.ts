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
  selector: 'app-creer-variation-produit',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './creer-variation-produit.html',
  styleUrl: './creer-variation-produit.scss',
})
export class CreerVariationProduit {
  private router = inject(Router);
  produit_id=0
  formData!: FormGroup;
  user:any
  
  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService,private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.get_all_variations()
    this.produit_id = parseInt(this.route.snapshot.paramMap.get('produit_id')??'');

   this.load_parent_data()

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
   
    this.formData = this.fb.group({
      produit_id:[this.produit_id, Validators.required],
      titre:['', Validators.required],
      description:['', ],
      supplement_prix:[0, ],
      stock: [0, ],
      categorie_id: [null, Validators.required],
      societe_id: [this.user.datas.societe_id, Validators.required],
      restaurant_id: [0, Validators.required],
      utilisateur_id: [this.user.datas.id, Validators.required],
    });
  }


  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    const finalFormData = this.formData.value;


    console.log(finalFormData);
   
    this.crudSaasService.ajouterVariationProduit(finalFormData).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été crée',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/variations-produit/liste-variations-produit']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de l’ajout","Echec")
      }
    });


    // appel API ici
  }

  
  parent_data:any


  load_parent_data(){

    this.crudSaasService.getProduitById(this.produit_id).subscribe({
      next: (res) => {
        this.parent_data=res
        this.formData.patchValue({ restaurant_id: this.parent_data.restaurant_id });
        this.formData.patchValue({ societe_id: this.parent_data.societe_id });

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

