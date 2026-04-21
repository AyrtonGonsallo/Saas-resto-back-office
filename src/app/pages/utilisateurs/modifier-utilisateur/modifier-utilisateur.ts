import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';

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
   user:any
  constructor(private authSerivce:AuthSaasRestoService,private route: ActivatedRoute, private restaurantService: RestaurantService, private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

     this.user = this.authSerivce.getUser();

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');

    this.get_all_roles()

    this.get_all_societes()

    this.get_all_restaurants()
    
    this.formData = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]],
      role_id: [0, Validators.required],
      societe_id: [0, ],
      restaurant_id: [[], ],
    });

    this.load_data(this.data_id)
  }


  verifier_roles_et_societes(user:any,currentUser:any){
    console.log('user',user)
    console.log('currentUser',currentUser)
    let prioriteRoleUser = user.datas.Role.priorite
    let prioriteCurrentRoleUser = currentUser.Role.priorite
    let societeUser = user.datas.societe_id
    let societeCurrentUser = currentUser.societe_id
    // Super admin peut tout faire
    if (prioriteRoleUser === 1) return;
    if(prioriteRoleUser >= prioriteCurrentRoleUser){
      console.log("bbbb",prioriteRoleUser,prioriteCurrentRoleUser)
      this.notificationsService.error("Vous avez un rôle inférieur","Echec")
      this.router.navigate(['/dashboard/default']);
    }
    if(societeUser!=societeCurrentUser){
      console.log(societeUser,societeCurrentUser)
      this.notificationsService.error("Vous ne faites pas parti de la même société","Echec")
      this.router.navigate(['/dashboard/default']);
    }

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
  allRestaurants:any[]


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

      let restaurant_id = this.restaurantService.getRestaurant()
      this.crudSaasService.getRestaurants(restaurant_id).subscribe({
        next: (res) => {
          this.restaurants=res
          this.allRestaurants=res
          console.log("restaurants",this.restaurants)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
    }


    get_all_roles(){
      let user = this.restaurantService.getUser()
      let role = user?.datas?.Role
      console.log("role",role)
      this.crudSaasService.getRoles(role.priorite).subscribe({
        next: (res) => {
          this.roles=res
          console.log("roles",this.roles)
        },
        error: (err) => {
          console.log(err.error)
          this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
        }
      });
    }


    
   data:any


    load_data(id:number){

      this.crudSaasService.getUtilisateurById(id).subscribe({
      next: (res) => {
        this.data=res
        this.verifier_roles_et_societes(this.user,this.data)

        this.formData = this.fb.group({
          nom: [this.data.nom, Validators.required],
          prenom: [this.data.prenom, Validators.required],
          email: [this.data.email, [Validators.required, Validators.email]],
          telephone: [this.data.telephone, [Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]],
          role_id: [this.data.role_id, Validators.required],
          societe_id: [this.data.societe_id, ],
          restaurant_id: [Array.isArray(this.data.Restaurants) 
            ? this.data.Restaurants.map((r:any) => r.id) 
            : []
          ]
        });


        this.formData.get('societe_id')?.valueChanges.subscribe((societe_id) => {

          console.log("societe_id choisi:", societe_id);

          if (!societe_id) {
            this.restaurants = this.allRestaurants;
          } else {
            this.restaurants = this.allRestaurants.filter(cat =>
              cat.societe_id === societe_id
            );
          }

          // 🔥 reset catégorie sélectionnée
          this.formData.patchValue({ restaurant_id: null });

        });
        
      },
      error: (err) => {
         if (err.status === 404) {
        this.notificationsService.error("Utilisateur introuvable", "Echec");
      } else if (err.status === 400) {
        this.notificationsService.error("ID utilisateur invalide", "Echec");
      } else {
        this.notificationsService.error("Erreur lors de la récupération", "Echec");
      }
      this.router.navigate(['utilisateurs/liste-utilisateurs']);
      }
    });

    }

}

