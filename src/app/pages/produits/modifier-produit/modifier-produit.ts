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


@Component({
  selector: 'app-modifier-produit',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-produit.html',
  styleUrl: './modifier-produit.scss',
})
export class ModifierProduit {
  public imagesUrl = environment.imagesUrl
  private router = inject(Router);
  data_id=0
  
  formData!: FormGroup;
  user:any
  constructor(private route: ActivatedRoute,private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
    this.load_data(this.data_id )
    this.get_categories()

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
      restaurant_id: [this.user.datas.Restaurants[0].id, Validators.required],
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

  categories_produits:any[]

  get_categories(){
     this.crudSaasService.getCategoriesProduit().subscribe({
      next: (res) => {
        this.categories_produits=res
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


  
   data:any


  load_data(id:number){

    this.crudSaasService.getProduitById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)

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

