import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
@Component({
  selector: 'app-modifier-abonnement',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule, Feathericon],
  templateUrl: './modifier-abonnement.html',
  styleUrl: './modifier-abonnement.scss',
})
export class ModifierAbonnement {
  private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  user:any
   model: NgbDateStruct;

  constructor(private route: ActivatedRoute,private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
    this.formData = this.fb.group({

      formule:['', Validators.required],
      cout: [0, Validators.required],
      date_debut:[null, Validators.required],
      date_expiration:[null, Validators.required],
      dernier_renouvellement:[null, ],
      statut:['actif', Validators.required],
      renouvellement_auto:[false, Validators.required],
      societe_id: [this.user?.datas?.societe_id, Validators.required],
    });

        
    this.load_data(this.data_id )
    
  }



  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    console.log(this.formData.value);
    this.crudSaasService.updateAbonnement(this.data_id ,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élement a bien été mis à jour',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/societes/liste-societes']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la mise à jour","Echec")
      }
    });

    // appel API ici
  }



   data:any


    load_data(id:number){

      this.crudSaasService.getAbonnementById(id).subscribe({
      next: (res) => {
        this.data=res

        console.log("this.data",this.data)
        
        this.formData = this.fb.group({
          formule:[this.data.formule, Validators.required],
          cout: [this.data.cout, Validators.required],
          date_debut:[this.toNgbDate(this.data.date_debut), Validators.required],
          date_expiration:[this.toNgbDate(this.data.date_expiration), Validators.required],
          dernier_renouvellement:[this.toNgbDate(this.data.dernier_renouvellement), ],
          statut:[this.data.statut, Validators.required],
          renouvellement_auto:[this.data.renouvellement_auto, Validators.required],
          societe_id: [this.data.societe_id, Validators.required],
        });
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

    }


    statuts = [
      { key: 'actif', name: 'Actif' },
      { key: 'inactif', name: 'Inactif' },
    ];



    formules = [
      { key: 'free', name: 'Free' },
      { key: 'premium', name: 'Premium' },
    ];


    toNgbDate(date: string) {
      if (!date) return null;

      const d = new Date(date);

      if (isNaN(d.getTime())) return null; // 🔥 sécurité

      return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      };
    }

}
