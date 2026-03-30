import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modifier-restaurant',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './modifier-restaurant.html',
  styleUrl: './modifier-restaurant.scss',
})
export class ModifierRestaurant {
  
  private router = inject(Router);
  formData!: FormGroup;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  data_id=0


  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
     this.load_data(this.data_id )

    this.get_all_utilisateurs()

    this.get_all_societes()
    
    this.formData = this.fb.group({
      nom: ['', Validators.required],
      lieu: ['', Validators.required],
      heure_debut: ['', [Validators.required, ]],
      heure_fin: ['', [Validators.required, ]],
      heure_cc_debut: ['', [, ]],
      heure_cc_fin: ['', [, ]],
      commandes_par_minutes: [0, ],
      societe_id: [0, Validators.required],
      utilisateur_id: [0, Validators.required],
    });
  }
 

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

  

    console.log(this.formData.value);

     this.crudSaasService.updateRestaurant(this.data_id,this.formData.value).subscribe({
          next: (res) => {
            Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'L\'élément a bien été modifié',
                  showConfirmButton: false,
                });
            setTimeout(() => {
              this.router.navigate(['/restaurants/liste-restaurants']);
            }, 2000);
          },
          error: (err) => {
            this.notificationsService.error("Erreur lors de la modification","Echec")
          }
        });


    // appel API ici
  }

  gestionnaires:any[]
  societes:any[]


    get_all_societes(){
      this.crudSaasService.getSocietes().subscribe({
        next: (res) => {
          this.societes=res
          console.log("societes",this.societes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des sociétés","Echec")
        }
      });
    }


    get_all_utilisateurs(){
      this.crudSaasService.getUtilisateursByRole('gestionnaire-restaurant').subscribe({
        next: (res) => {
          this.gestionnaires = res.map(g => ({
          ...g,
          fullName: g.prenom + ' ' + g.nom + ' (' + g.Societe.titre + ')'
        }));
          console.log("utilisateurs",this.gestionnaires)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des utilisateurs","Echec")
        }
      });
    }

    get_heures(){
      let res= Array.from({ length: 24 }, (_, i) => {
        const heure = i.toString().padStart(2, '0') + ':00';
        return {
          position: i + 1,
          label: heure
        };
      });
      return res
    }


    heures_deb = this.get_heures()

    heures_fin = this.get_heures()

    heures_cc_deb = this.get_heures()

    heures_cc_fin = this.get_heures()


    
   data:any


    load_data(id:number){

      this.crudSaasService.getRestaurantById(id).subscribe({
      next: (res) => {
        this.data=res

      

         this.formData = this.fb.group({
          nom: [this.data.nom, Validators.required],
          lieu: [this.data.lieu, Validators.required],
          heure_debut: [this.data.heure_debut, [Validators.required, ]],
          heure_fin: [this.data.heure_fin, [Validators.required, ]],
          heure_cc_debut: [this.data.heure_cc_debut, [, ]],
          heure_cc_fin: [this.data.heure_cc_fin, [, ]],
          commandes_par_minutes: [this.data.commandes_par_minutes, ],
          societe_id: [this.data.societe_id, Validators.required],
          utilisateur_id: [this.data.utilisateur_id, Validators.required],
        });
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

    }

}
