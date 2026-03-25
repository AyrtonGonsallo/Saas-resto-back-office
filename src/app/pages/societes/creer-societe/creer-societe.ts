import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-creer-societe',
  imports: [ReactiveFormsModule,CommonModule  ],
  templateUrl: './creer-societe.html',
  styleUrl: './creer-societe.scss',
  standalone: true,
})
export class CreerSociete {
  
  
  formSociete!: FormGroup;
  constructor(private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {
    
    this.formSociete = this.fb.group({
      titre: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      mot_de_passe: ['', Validators.required],
      confirmed_mot_de_passe: ['', Validators.required]
    });
  }

  checkpasswords(){
    const val1 = this.formSociete.get('mot_de_passe')?.value;
    const val2 = this.formSociete.get('confirmed_mot_de_passe')?.value;

    return val1 === val2;
  }

  onSubmit() {
    
    if (this.formSociete.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formSociete.markAllAsTouched();
      return;
    }

    if (!this.checkpasswords()) {
      this.notificationsService.error("Les mots de passe ne correspondent pas","Echec")
      this.formSociete.markAllAsTouched();
      return;
    }
    this.notificationsService.success("Formulaire valide","Succès")

    console.log(this.formSociete.value);


    // appel API ici
  }

}
