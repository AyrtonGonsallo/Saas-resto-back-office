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

@Component({
  selector: 'app-modifier-role',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './modifier-role.html',
  styleUrl: './modifier-role.scss',
})
export class ModifierRole {
  private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {
    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
     this.formData = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      priorite: [0, Validators.required],
      commentaire: ['', ],
    });
    this.load_data(this.data_id )
    
  }

  types = [
    { key: 'super-admin', name: 'Super admin' },
    { key: 'admin', name: 'Admin' },
    { key: 'client', name: 'Client',},
    { key: 'public', name: 'Public' },
    { key: 'gestionnaire-restaurant',name: 'Gestionnaire de restaurant' },
    { key: 'gestionnaire-societe',name: 'Gestionnaire de société' },
    { key: 'lecteur-planning', name: 'Lecteur planning' },
    { key: 'lecteur-cuisine', name: 'Lecteur cuisine' },
    { key: 'employé', name: 'Employé' },
    { key: 'livreur', name: 'Livreur' },
  ];

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    console.log(this.formData.value);
    this.crudSaasService.updateRole(this.data_id ,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élement a bien été mis à jour',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/roles/liste-roles']);
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

      this.crudSaasService.getRoleById(id).subscribe({
      next: (res) => {
        this.data=res

        this.formData = this.fb.group({
          titre: [this.data.titre, Validators.required],
          type: [this.data.type, Validators.required],
          priorite: [this.data.priorite, Validators.required],
          commentaire: [this.data.commentaire, ],
        });
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

    }

}
