import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-creer-role',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './creer-role.html',
  styleUrl: './creer-role.scss',
})
export class CreerRole {
   private router = inject(Router);
  
  formData!: FormGroup;
  constructor(private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {
    
    this.formData = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      priorite: ['', Validators.required],
      commentaire: ['', ],
    });
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
    this.crudSaasService.ajouterRole(this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été crée',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/roles/liste-roles']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de l’ajout","Echec")
      }
    });

   

    


    // appel API ici
  }

}
