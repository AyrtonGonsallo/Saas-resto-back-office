import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonLoginForm } from '../../../component/pages/authentication/common-login-form/common-login-form';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import Swal from 'sweetalert2';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-formulaire-reservation',
  imports: [RouterModule, CommonLoginForm,ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,   ],
  templateUrl: './formulaire-reservation.html',
  styleUrl: './formulaire-reservation.scss',
})
export class FormulaireReservation {

formData!: FormGroup;
button_suiv_text='Suivant'
button_prec_text='Précédent'
current_step=1
societe_id=0
progression=0



  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
  

    
  ngOnInit(): void {

    this.societe_id = parseInt(this.route.snapshot.paramMap.get('societe_id')??'');
    this.load_societe_data(this.societe_id )
    this.get_all_restaurants()

    this.get_all_societes()

     this.get_all_services()

    this.get_all_tables()

    this.get_all_tags()

    this.get_all_creneaux()
    
    this.formData = this.fb.group({
      nom: ['', Validators.required], //etape 1
      prenom: ['', Validators.required], //etape 1
      email: ['', [Validators.required, Validators.email]], //etape 1
      telephone: ['', [Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]], //etape 1
      date_reservation: [null, [Validators.required ]], //etape 3
      heure_reservation: [null, [Validators.required ]], //etape 3
      nombre_de_personnes: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.min(1),
        Validators.max(20)
      ]], //etape 3
      nb_couverts: ['', [
        Validators.pattern(/^[0-9]+$/),
        Validators.min(1),
        Validators.max(50)
      ]], //etape 3
      notes: ['', []], //etape 3
      demandes_speciales: ['', []], //etape 3
      statut: ['En attente', []], //etape 3
      service_id: [null, Validators.required], //etape 3
      table_id: [null, Validators.required], //etape 3
      creneau_id: [null, Validators.required], //etape 3
      tags: [null, Validators.required], //etape 3
      societe_id: [this.societe_id, Validators.required], //pas d'etape 
      restaurant_id: [null, Validators.required], //etape 2
      client_id: [null, ], //pas d'etape 
    });

    this.formData.get('restaurant_id')?.valueChanges.subscribe((restaurant_id) => {

      console.log("restaurant_id choisi:", restaurant_id);

      if (!restaurant_id) {
        this.tables = this.allTables;
        this.crenaux = this.allCrenaux;
        this.services=this.allServices;
        this.tags=this.allTags;
      } else {
        this.tables = this.allTables.filter(table =>
          table.societe_id === this.societe_id &&
          table.restaurant_id === restaurant_id
        ).map(table => ({
          ...table,
          fullName: table.numero + ' ' + table.nb_places + ' places' 
        }));

        this.crenaux=this.allCrenaux.filter(creneau =>
          creneau.societe_id === this.societe_id &&
          creneau.restaurant_id === restaurant_id
        ).map(creneau => ({
          ...creneau,
          fullName: creneau.heure_debut + ' - ' + creneau.heure_fin
        }));

        this.services=this.allServices.filter(service =>
          service.societe_id === this.societe_id &&
          service.restaurant_id === restaurant_id
        );

        this.tags=this.allTags.filter(tag =>
          tag.societe_id === this.societe_id &&
          tag.restaurant_id === restaurant_id
        );
      }

      // 🔥 reset catégorie sélectionnée
      this.formData.patchValue({ utilisateur_id: null });

    });


  }

  final_reservation:any

  next(){
    let res = this.valider_formulaire_etape(this.current_step)
    if(this.current_step<5 && res){
      this.progression+=25
      this.current_step++
    }else if(this.current_step==5){
      console.log('this.formData.value',this.formData.value);
      this.onSubmit()
    }
    
  }
  prec(){
    if(this.current_step>1){
      this.progression-=25
      this.current_step--
    }
    console.log("this.current_step",this.current_step)
  }

    onSubmit() {
      
      if (this.formData.invalid) {
        this.notificationsService.error("Formulaire invalide","Echec")
        this.formData.markAllAsTouched();
        return;
      }
     
      console.log(this.formData.value);
     
      this.crudSaasService.ajouterReservation(this.formData.value).subscribe({
        next: (res) => {
          this.final_reservation=res
          Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Votre réservation a bien été enregistrée',
                showConfirmButton: false,
              });
          setTimeout(() => {
          }, 2000);
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la réservation","Echec")
          console.log(err)
        }
      });
  
  
      // appel API ici
    }
  
   
  
  
    restaurants:any[]
    allRestaurants:any[]
    societes:any[]
    crenaux:any[]
    tables:any[]
    tags:any[]
    services:any[]
    allTables:any[]
    allTags:any[]
    allCrenaux:any[]
    allServices:any[]
    societeData:any


    load_societe_data(id:number){
      this.crudSaasService.getSocieteById(id).subscribe({
        next: (res) => {
          this.societeData=res
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération","Echec")
        }
      });
    }
  
    get_all_restaurants(){
      this.crudSaasService.getRestaurants(null).subscribe({
        next: (res) => {
          this.restaurants=res.filter(cat =>
          cat.societe_id === this.societe_id
        );
          this.allRestaurants=res.filter(cat =>
          cat.societe_id === this.societe_id
        );
          console.log("getRestaurants",this.allRestaurants)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
    }

    get_all_creneaux(){
      this.crudSaasService.getCreneaux(null).subscribe({
        next: (res) => {
          this.crenaux=res.filter(creneau =>
            creneau.societe_id === this.societe_id
          ).map(creneau => ({
            ...creneau,
            fullName: creneau.heure_debut + ' - ' + creneau.heure_fin
          }));
          this.allCrenaux=res.filter(creneau =>
            creneau.societe_id === this.societe_id
          ).map(creneau => ({
            ...creneau,
            fullName: creneau.heure_debut + ' - ' + creneau.heure_fin
          }));

          console.log("getCreneaux",this.allCrenaux)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des crenaux","Echec")
        }
      });
    }


    get_all_services(){
      this.crudSaasService.getServices(null).subscribe({
        next: (res) => {
          this.services=res.filter(service =>
            service.societe_id === this.societe_id
          );
          this.allServices=res.filter(service =>
            service.societe_id === this.societe_id
          );

          console.log("getServices",this.allServices)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des crenaux","Echec")
        }
      });
    }

     get_all_tags(){
      this.crudSaasService.getTags(null).subscribe({
        next: (res) => {
          this.tags=res.filter(tag =>
            tag.societe_id === this.societe_id
          );
          this.allTags=res.filter(tag =>
            tag.societe_id === this.societe_id
          );

          console.log("getTags",this.allTags)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des tags","Echec")
        }
      });
    }

    get_all_tables(){
      this.crudSaasService.getTables(null).subscribe({
        next: (res) => {
          this.tables=res.filter(table =>
            table.societe_id === this.societe_id
          ).map(table => ({
            ...table,
            fullName: table.numero + ' ' + table.nb_places + ' places' 
          }));

          this.allTables=res.filter(table =>
            table.societe_id === this.societe_id
          ).map(table => ({
            ...table,
            fullName: table.numero + ' ' + table.nb_places + ' places' 
          }));

          console.log("getTables",this.allTables)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des tables","Echec")
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

  stepClass(step: number) {
    return {
      current: this.current_step === step,
      'to-come': this.current_step < step,
      visited: this.current_step > step
    };
  }

  valider_formulaire_etape(num_etape: number): boolean {
    let champs: string[] = [];

    switch (num_etape) {
      case 1:
        champs = ['nom', 'prenom', 'email', 'telephone'];
        break;

      case 2:
        champs = ['restaurant_id'];
        break;

      case 3:
        champs = [
          'date_reservation',
          'heure_reservation',
          'nombre_de_personnes',
          'service_id',
          'table_id',
          'creneau_id'
        ];
        break;
      case 4:
        return true
      case 5:
        return true
    }

    // 🔥 Marquer les champs comme touchés
    champs.forEach(champ => {
      this.formData.get(champ)?.markAsTouched();
      this.formData.get(champ)?.updateValueAndValidity();
    });

    // ✅ Vérifier validité
    return champs.every(champ => this.formData.get(champ)?.valid);
  }
 
}
