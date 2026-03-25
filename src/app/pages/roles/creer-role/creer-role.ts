import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-creer-role',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './creer-role.html',
  styleUrl: './creer-role.scss',
})
export class CreerRole {
  
  
  formRole!: FormGroup;
  constructor(private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {
    
    this.formRole = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

 types = [
    { key: 'super-admin', name: 'Super admin' },
    { key: 'admin', name: 'Admin' },
    { key: 'client', name: 'Client',},
    { key: 'public', name: 'Public' },
    { key: 'gestionnaire',name: 'Gestionnaire' },
    { key: 'lecteur planning', name: 'Lecteur planning' },
    { key: 'lecteur cuisine', name: 'Lecteur cuisine' },
    { key: 'employé', name: 'Employé' },
    { key: 'livreur', name: 'Livreur' },
  ];

  onSubmit() {
    
    if (this.formRole.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formRole.markAllAsTouched();
      return;
    }
    console.log(this.formRole.value);
    this.crudSaasService.ajouterRole(this.formRole.value).subscribe({
      next: (res) => {
        this.notificationsService.success('Rôle ajouté','Succès');
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de l’ajout","Echec")
      }
    });

   

    


    // appel API ici
  }

}
