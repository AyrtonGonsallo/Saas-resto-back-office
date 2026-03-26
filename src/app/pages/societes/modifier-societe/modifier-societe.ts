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
  selector: 'app-modifier-societe',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './modifier-societe.html',
  styleUrl: './modifier-societe.scss',
})
export class ModifierSociete {
  private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {
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



   data:any


    load_data(id:number){

      this.crudSaasService.getSocieteById(id).subscribe({
      next: (res) => {
        this.data=res

        this.formData = this.fb.group({
          titre: [this.data.titre, Validators.required],
          status: [this.data.status, Validators.required],
        });
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

    }

}

