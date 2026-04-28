import { Component, inject, } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import Swal from 'sweetalert2';
import { PanierService } from '../../../shared/services/click-and-collect/panier.service';


@Component({
  selector: 'app-creer-livraison',
  imports: [RouterModule,ReactiveFormsModule,CommonModule,FormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './creer-livraison.html',
  styleUrl: './creer-livraison.scss',
})
export class CreerLivraison {
  private router = inject(Router);
    
  formData!: FormGroup;
  minDate: NgbDateStruct;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService,private panierService:PanierService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
  

    
  ngOnInit(): void {

    const today = new Date();

    this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

   
    this.load_datas()
    
    
    this.formData = this.fb.group({
     
      date_livraison: [null, [Validators.required, ]], //etape 3
      heure_livraison: [null, [Validators.required, ]], //etape 3     
      notes_livreur: ['', [, ]], //etape 3   
      adresse_livraison: ['', [Validators.required, ]], //etape 3   
      code_postal: ['', [, ]], //etape 3   
      ville: ['', [, ]], //etape 3   
      frais_livraison: [0, [Validators.required, ]], //etape 3   
      commande_id: [null, [Validators.required, ]], //pas d'etape 
      livreur_id: [null, [Validators.required, ]], //pas d'etape 
      client_id: [null, [Validators.required, ]], //pas d'etape 
      statut: ['En attente', [Validators.required, ]], //pas d'etape 
      societe_id: [null, [Validators.required, ]], //pas d'etape 
      restaurant_id: [null, [Validators.required, ]], //etape 2
      
    });



    this.formData.get('restaurant_id')?.valueChanges.subscribe((restaurant_id) => {

      console.log("restaurant_id choisi:", restaurant_id);
      this.selectedRestaurant =  this.restaurants.filter(r =>
          r.id === restaurant_id
        )[0];

      console.log('selectedRestaurant',this.selectedRestaurant)

      this.load_datas2()

      this.parametre_montant_livraison_resto =
      this.selectedRestaurant.parametres?.find((p: any) =>
        p.type === 'montant_livraison_click_and_collect' &&
        p.est_actif === true
      );
      console.log('parametre_montant_livraison_resto',this.parametre_montant_livraison_resto)
      this.montant_livraison = parseInt(this.parametre_montant_livraison_resto.valeur) 
      this.formData.patchValue({ frais_livraison: this.montant_livraison });

      // 
      this.formData.patchValue({ client_id: null });
      this.formData.patchValue({ livreur_id: null });
      this.formData.patchValue({ commande_id: null });

    });
  

 
    
  }

  parametre_montant_livraison_resto:any
  montant_livraison:number
  final_livraison:any


  onSubmit() {
    
    if (this. formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

    let date_passee = this.dateHeureFutureValidator()
    let heure_not_in_horaires_resto = this.heureIsInHorairesSelectedRestoValidator()
    this.heure_not_in_horaires_resto = !heure_not_in_horaires_resto
    this.date_passee = !date_passee
    if(this.date_passee || this.heure_not_in_horaires_resto){
      this.formData.markAllAsTouched();
      return ;
    }


    const payload =  this.formData.value;

    console.log('payload', payload);

    
    
    this.crudSaasService.ajouterLivraison(payload).subscribe({
      next: (res) => {
        this.final_livraison=res
        console.log('final_livraison',res)
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'éléméent a bien été enregistrée',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/livraisons/liste-livraisons']);
        }, 2000);
       
      },
      error: (err) => {
        this.notificationsService.error(err.error.message,"Echec")
        console.log(err.error.message)
      }
    });

  }


  load_datas(){
    this.get_all_restaurants()
    this.get_all_societes()

  }

    load_datas2(){
    this.get_all_clients_and_livreurs()
    this.get_all_commandes()

  }


  selectedRestaurant:any
  clients:any[]
  allClients:any[]
  livreurs:any[]
  allLivreurs:any[]
  restaurants:any[]
  allRestaurants:any[]
  societes:any[]

  allCommandes:any[]
  commandes:any[]

  get_all_restaurants(){

    let restaurant_id = this.restaurantService.getRestaurant()
      this.crudSaasService.getRestaurantsWithParametres(restaurant_id).subscribe({
        next: (res) => {
          this.restaurants=res
          this.allRestaurants=res
          console.log("getRestaurants",this.restaurants)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
  }

  get_all_commandes(){

    let restaurant_id = this.selectedRestaurant.id
      this.crudSaasService.getCommandes(restaurant_id).subscribe({
        next: (res) => {
          this.commandes=res.filter(r =>
            r.restaurant_id === restaurant_id).map(g => ({
            ...g,
            fullName: g.client.prenom + ' ' + g.client.nom + ' (' + g.Restaurant.nom + ')'
          }));
          this.allCommandes=this.commandes
          console.log("allCommandes",this.allCommandes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
  }

   get_all_societes(){
      this.crudSaasService.getSocietes().subscribe({
        next: (res) => {
          this.societes=res
          console.log("getSocietes",this.societes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des sociétés","Echec")
        }
      });
    }

     get_all_clients_and_livreurs(){
      let restaurant_id = this.selectedRestaurant.id
      this.crudSaasService.getUtilisateursByRole('client',restaurant_id).subscribe({
        next: (res) => {
          this.allClients = res.filter(r =>
            r.Restaurants?.some((resto:any) => resto.id === restaurant_id)).map(g => ({
            ...g,
            fullName: g.prenom + ' ' + g.nom + ' (' + g.Restaurants[0].nom + ')'
          }));
          this.clients = this.allClients;
          console.log("clients",this.clients)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des clients","Echec")
        }
      });

      this.crudSaasService.getUtilisateursByRole('livreur',restaurant_id).subscribe({
        next: (res) => {
          this.allLivreurs = res.filter(r =>
            r.Restaurants?.some((resto:any) => resto.id === restaurant_id)).map(g => ({
            ...g,
            fullName: g.prenom + ' ' + g.nom + ' (' + g.Restaurants[0].nom + ')'
          }));
          this.livreurs = this.allLivreurs
          console.log("allLivreurs",this.allLivreurs)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des allLivreurs","Echec")
        }
      });
    }



    
  date_passee=false
  dateHeureFutureValidator() {
    

    const date = this.formData.get('date_livraison')?.value;
    const time = this.formData.get('heure_livraison')?.value;

    if (!date || !time) return null;

    const now = new Date();

    const selected = new Date(
      date.year,
      date.month - 1,
      date.day,
      time.hour,
      time.minute,
      0
    );
    console.log('heure',selected, now,selected < now)

    if (selected < now) {
      return false;
    }

    return true;
  };

  heure_not_in_horaires_resto = false
  heureIsInHorairesSelectedRestoValidator() {
    
    const heureDebut =this.selectedRestaurant.heure_cc_debut //string 12:00
    const heureFin =this.selectedRestaurant.heure_cc_fin //string 20:00
    const time = this.formData.get('heure_livraison')?.value;
    //verifier que time dans les limites de debut et fin

    if (!heureDebut || !heureFin) return true;

    const [hD, mD] = heureDebut.split(':').map(Number);
    const [hF, mF] = heureFin.split(':').map(Number);

    const debutMinutes = hD * 60 + mD;
    const finMinutes   = hF * 60 + mF;

    const selectedMinutes = time.hour * 60 + time.minute;

    if (selectedMinutes < debutMinutes || selectedMinutes > finMinutes) {
      return false
    }


    return true;
  }
 
 
}
