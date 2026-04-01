import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';

@Component({
  selector: 'app-modifier-portefeuille',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './modifier-portefeuille.html',
  styleUrl: './modifier-portefeuille.scss',
})
export class ModifierPortefeuille {
   private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  user:any

  constructor(private route: ActivatedRoute,private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
     this.formData = this.fb.group({
      solde_sms: [0, Validators.required],
      solde_ia: [0, Validators.required],
      historique_id: [null],
      alert_seuil_sms: [0, Validators.required],
      alert_seuil_ia: [0, Validators.required],
      societe_id: [0, Validators.required],
    });
    this.load_data(this.data_id )
    
  }



  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      console.log(this.formData.value);
      this.formData.markAllAsTouched();
      return;
    }
    console.log(this.formData.value);
    this.crudSaasService.updatePortefeuille(this.data_id ,this.formData.value).subscribe({
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

      this.crudSaasService.getPortefeuilleById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)

        this.formData = this.fb.group({
          solde_sms: [this.data.solde_sms, Validators.required],
          solde_ia: [this.data.solde_ia, Validators.required],
          historique_id: [this.data.historique_id],
          alert_seuil_sms: [this.data.alert_seuil_sms, Validators.required],
          alert_seuil_ia: [this.data.alert_seuil_ia, Validators.required],
          societe_id: [this.data?.societe_id, Validators.required],
        });
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

    }

}
