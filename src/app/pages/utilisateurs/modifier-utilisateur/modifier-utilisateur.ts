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
  selector: 'app-modifier-utilisateur',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './modifier-utilisateur.html',
  styleUrl: './modifier-utilisateur.scss',
})
export class ModifierUtilisateur {
  private router = inject(Router);
  formData!: FormGroup;
   data_id=0
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');

    this.get_all_roles()

    this.get_all_societes()

    this.get_all_restaurants()
    
    this.formData = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      role_id: [0, Validators.required],
      societe_id: [0, ],
      restaurant_id: [[], ],
    });

    this.load_data(this.data_id)
  }



  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }



    console.log(this.formData.value);

     this.crudSaasService.updateUtilisateur(this.data_id,this.formData.value).subscribe({
          next: (res) => {
            Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'L\'élément a bien été modifié',
                  showConfirmButton: false,
                });
            setTimeout(() => {
              this.router.navigate(['/utilisateurs/liste-utilisateurs']);
            }, 2000);
          },
          error: (err) => {
            this.notificationsService.error("Erreur lors de la modification","Echec")
          }
        });


    // appel API ici
  }

  roles:any[]
  societes:any[]
  restaurants:any[]


    get_all_societes(){
      this.crudSaasService.getSocietes().subscribe({
        next: (res) => {
          this.societes=res
          console.log("societes",this.societes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des societes","Echec")
        }
      });
    }

    get_all_restaurants(){
      this.crudSaasService.getRestaurants().subscribe({
        next: (res) => {
          this.restaurants=res
          console.log("restaurants",this.restaurants)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
    }


    get_all_roles(){
      this.crudSaasService.getRoles().subscribe({
        next: (res) => {
          this.roles=res
          console.log("roles",this.roles)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
        }
      });
    }


    
   data:any


    load_data(id:number){

      this.crudSaasService.getUtilisateurById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log('datas',this.data)

         this.formData = this.fb.group({
          nom: [this.data.nom, Validators.required],
          prenom: [this.data.prenom, Validators.required],
          email: [this.data.email, [Validators.required, Validators.email]],
          telephone: [this.data.telephone],
          role_id: [this.data.role_id, Validators.required],
          societe_id: [this.data.societe_id, ],
          restaurant_id: [Array.isArray(this.data.Restaurants) 
            ? this.data.Restaurants.map((r:any) => r.id) 
            : []
          ]
    });
        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

    }

}

