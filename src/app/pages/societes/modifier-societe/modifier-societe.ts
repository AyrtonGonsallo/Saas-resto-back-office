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
  selector: 'app-modifier-societe',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './modifier-societe.html',
  styleUrl: './modifier-societe.scss',
})
export class ModifierSociete {
  private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  user: any;
  constructor(private route: ActivatedRoute, private authSerivce: AuthSaasRestoService, private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {
    this.user = this.authSerivce.getUser();
    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
     this.formData = this.fb.group({
      titre: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.load_data(this.data_id )
    
  }

   status = [
    { key: 'active', name: 'active' },
    { key: 'inactive', name: 'inactive' },
  ];

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    console.log(this.formData.value);
    this.crudSaasService.updateSociete(this.data_id ,this.formData.value).subscribe({
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

  verifier_roles_et_societe(user: any, currentData: any) {
    const prioriteRoleUser = user?.datas?.Role?.priorite;
    const societeUser = user?.datas?.societe_id;
    const societeCurrentData = currentData?.id;

    // super admin → accès total
    if (prioriteRoleUser === 1) return;
 
    // seuls super admin et gestionnaire société
    if (prioriteRoleUser > 2) {
      this.notificationsService.error(
        "Vous n'avez pas accès à cette page",
        "Echec"
      );
      this.router.navigate(['/dashboard/default']);
      return;
    }

    // gestionnaire société → seulement sa société
    if (prioriteRoleUser === 2 && societeUser !== societeCurrentData) {
      this.notificationsService.error(
        "Vous ne pouvez pas modifier une autre société",
        "Echec"
      );
      this.router.navigate(['/dashboard/default']);
      return;
    }
  }



   data:any


    load_data(id:number){

      this.crudSaasService.getSocieteById(id).subscribe({
      next: (res) => {
        this.data=res
        this.verifier_roles_et_societe(this.user, this.data);
        this.formData = this.fb.group({
          titre: [this.data.titre, Validators.required],
          status: [this.data.status, Validators.required],
        });
        
      },
      error: (err) => {
        if (err.status === 404) {
        this.notificationsService.error("societe introuvable", "Echec");
      } else if (err.status === 400) {
        this.notificationsService.error("ID societe invalide", "Echec");
      } else {
        this.notificationsService.error("Erreur lors de la récupération", "Echec");
      }
      this.router.navigate(['/societes/liste-societes']);
      }
    });

    }

}

