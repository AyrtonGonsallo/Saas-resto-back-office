import { Component, } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environment';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BarRatingModule } from 'ngx-bar-rating';


@Component({
  selector: 'app-ajouter-avis',
  imports: [RouterModule,ReactiveFormsModule,CommonModule,FormsModule, NgSelectModule, NgbModule, AngularEditorModule,BarRatingModule  ],
  templateUrl: './ajouter-avis.html',
  styleUrl: './ajouter-avis.scss',
})
export class AjouterAvis {

  public imagesUrl = environment.imagesUrl
    
  formData!: FormGroup;
  data:any
  type_id:number
  objet_id:number
  typeString=""
  cssRate=0

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}
  

    
  ngOnInit(): void {

    this.type_id = parseInt(this.route.snapshot.paramMap.get('type_id')??'');
    this.objet_id = parseInt(this.route.snapshot.paramMap.get('objet_id')??'');
    this.load_objet_data(this.type_id,this.objet_id )
    this.typeString=(this.type_id==1)?'Formulaire d\'évaluation sur une réservation':'Formulaire d\'évaluation sur une commande'
    
  }



  load_objet_data(type_id:number,objet_id:number){

    if(type_id==1){//reservation

      this.crudSaasService.getAvisReservationById(objet_id).subscribe({
        next: (res) => {
          this.data=res
          this.create_form(type_id,this.data)
        },
        error: (err) => {
          if (err.status === 404) {
            this.notificationsService.error("Réservation introuvable", "Echec");
          } else if (err.status === 400) {
            this.notificationsService.error("ID de réservation invalide", "Echec");
          } else {
            this.notificationsService.error("Erreur lors de la récupération", "Echec");
          }
        }
      });

    }else{//commande
      this.crudSaasService.getAvisCommandeById(objet_id).subscribe({
        next: (res) => {
          this.data=res
          this.create_form(type_id,this.data)
        },
        error: (err) => {
          if (err.status === 404) {
            this.notificationsService.error("Commande introuvable", "Echec");
          } else if (err.status === 400) {
            this.notificationsService.error("ID de commande invalide", "Echec");
          } else {
            this.notificationsService.error("Erreur lors de la récupération", "Echec");
          }
        }
      });

    }
  }

  create_form(type_id:number,data:any){
    this.formData = this.fb.group({
      reservation_id: [(type_id==1)?data.id:null, ], //etape 1
      commande_id: [(type_id==2)?data.id:null, ], //etape 1
      objet: [(type_id==1)?'Réservation':'Click & collect', [Validators.required, ]], //etape 1
      note: [0, [Validators.required,]], //etape 1
      texte: ['', [Validators.required ]], //etape 3 
      client_id: [data.client_id, Validators.required], //pas d'etape 
      restaurant_id: [data.restaurant_id, Validators.required], //etape 2
      societe_id: [data.societe_id, ], //pas d'etape 
    });
    console.log('data',data)
  }

  onSubmit() {
      
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    
    console.log(this.formData.value);
    
    this.crudSaasService.ajouterAvis(this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Votre évaluation à été envoyée',
          showConfirmButton: false,
        });
        this.load_objet_data(this.type_id,this.objet_id )
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de l’ajout","Echec")
      }
    });

  }

  




 
}