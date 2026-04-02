
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterModule, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../../shared/services/user/user.service';

 
@Component({
  selector: 'app-common-register-form',
  imports: [ReactiveFormsModule,CommonModule,RouterModule,ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './common-register-form.html',
  styleUrl: './common-register-form.scss',
})
export class CommonRegisterForm {
  private router = inject(Router);
  formData!: FormGroup;

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    

    
    this.formData = this.fb.group({
      titre: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]],
      mot_de_passe: ['', Validators.required],
      confirmed_mot_de_passe: ['', Validators.required],
    });

    
  }

  checkpasswords(){
    const val1 = this.formData.get('mot_de_passe')?.value;
    const val2 = this.formData.get('confirmed_mot_de_passe')?.value;

    return val1 === val2;
  }

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

    if (!this.checkpasswords()) {
      this.notificationsService.error("Les mots de passe ne correspondent pas","Echec")
      this.formData.markAllAsTouched();
      return;
    }

    console.log(this.formData.value);

     this.crudSaasService.ajouterSociete(this.formData.value).subscribe({
          next: (res) => {
            Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'L\'élément a bien été crée',
                  showConfirmButton: false,
                });
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 2000);
          },
          error: (err) => {
            console.log("erreur",err.error)
            this.notificationsService.error("Erreur lors de l’ajout","Echec")
          }
        });


    // appel API ici
  }


}

