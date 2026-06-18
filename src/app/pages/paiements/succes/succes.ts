import { Component, } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environment';



@Component({
  selector: 'app-succes',
  imports: [RouterModule,CommonModule,NgSelectModule, NgbModule ],
  templateUrl: './succes.html',
  styleUrl: './succes.scss',
})
export class Succes {

  
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
    this.typeString=(this.type_id==1)?'Le paiement de votre réservation a bien été reçu':'Le paiement de votre commande a bien été reçu'
    
  }



  load_objet_data(type_id:number,objet_id:number){

    if(type_id==1){//reservation

      this.crudSaasService.getReservationRecapById(objet_id).subscribe({
        next: (res) => {
          this.data=res
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
      this.crudSaasService.getCommandeRecapById(objet_id).subscribe({
        next: (res) => {
          this.data=res
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


  get_tables_label(tables:any){
    let res=""
    tables.forEach((table:any) => {
      res+= `${table.nb_places} personnes, ${table.ZoneTable?.titre}<br>`;
    });
    return res;
    
  }



  get_unit_cummul_price_ht(item:any){
    let prix = 0 
    prix = item.prix_ht
    if(item.variations){
      item.variations.forEach((v:any) => {
        prix += v.prix_supplement
      });
    }
    return prix
  }

  get_cummul_price_ht(item:any){
    let prix = 0 
    prix = item.prix_ht
    if(item.variations){
      item.variations.forEach((v:any) => {
        prix += v.prix_supplement
      });
    }
    
    return prix * item.quantite
  }

  get_sous_total_price_ht(items:any){
    let prix = 0 
    items.forEach((i:any) => {
      prix += this.get_cummul_price_ht(i)
    });
    return prix
  }


 

}
