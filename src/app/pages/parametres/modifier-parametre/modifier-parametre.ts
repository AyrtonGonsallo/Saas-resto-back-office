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
  constructor(private route: ActivatedRoute,private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

   

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )

     this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
    this.load_data(this.data_id )
   
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




   types = [
    { key: 'tva', name: 'Tva' },
    { key: 'coefficient', name: 'Coefficient' },
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


  
   data:any


  load_data(id:number){

    this.crudSaasService.getParametreById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)

       
        this.formData = this.fb.group({
          titre: [this.data.titre, Validators.required],
          type: [this.data.type, Validators.required],
          valeur: [this.data.valeur, Validators.required],
          description: [this.data.description, ],
          est_actif: [this.data.est_actif, Validators.required],
          societe_id: [this.user.datas.societe_id, Validators.required],
          restaurant_id: [this.user.datas.Restaurants[0].id, Validators.required],
          utilisateur_id: [this.user.datas.id, Validators.required],
        });
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });
  }

}