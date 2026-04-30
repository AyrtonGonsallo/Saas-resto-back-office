import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulaire-reservation',
  imports: [RouterModule,ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,   ],
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
restaurantID = 0
selectedRestaurant : any
urlPayment = null
paymentRestoActive = true
minDate: NgbDateStruct;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
  

    
  ngOnInit(): void {

    const today = new Date();

    this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.societe_id = parseInt(this.route.snapshot.paramMap.get('societe_id')??'');
    this.restaurantID = parseInt(this.route.snapshot.paramMap.get('restaurant_id')??'');
    this.load_societe_data(this.societe_id )
    
    
    this.formData = this.fb.group({
      nom: ['', Validators.required], //etape 1
      prenom: ['', Validators.required], //etape 1
      email: ['', [Validators.required, Validators.email]], //etape 1
      telephone: ['', [Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]], //etape 1
      date_reservation: [null, [Validators.required, ]], //etape 3
      heure_reservation: [null, [Validators.required, ]], //etape 3
      nombre_de_personnes: [1, [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.min(1),
        Validators.max(30)
      ]], //etape 3
      nb_couverts: [1, [
        Validators.pattern(/^[0-9]+$/),
        Validators.min(1),
        Validators.max(60)
      ]], //etape 3
      notes: ['', []], //etape 3
      demandes_speciales: ['', []], //etape 3
      statut: ['En attente', []], //etape 3
      service_id: [null, Validators.required], //etape 3
      table_id: [null, Validators.required], //etape 3
      creneau_id: [null, Validators.required], //etape 3
      tags: [null, ], //etape 3
      societe_id: [this.societe_id, Validators.required], //pas d'etape 
      restaurant_id: [this.restaurantID, Validators.required], //etape 2
      client_id: [null, ], //pas d'etape 
    });

    

    

    this.formData.get('table_id')?.valueChanges.subscribe(() => {
      this.couvertsEtPlacesValidator();
    });

    this.formData.get('nb_couverts')?.valueChanges.subscribe(() => {
      this.couvertsEtPlacesValidator();
    });

    this.formData.get('nombre_de_personnes')?.valueChanges.subscribe((nombre_de_personnes) => {
      this.formData.get('nb_couverts')?.setValue(nombre_de_personnes, { emitEvent: false });
      this.couvertsEtPlacesValidator();
    });

  
  }


  load_restaurant(restaurant_id:number) {

      console.log("restaurant_id choisi:", restaurant_id);
      this.restaurantID = restaurant_id
      this.selectedRestaurant = this.restaurants.filter((r:any) =>
        r.id === restaurant_id
      )[0];
      let paramrestoactif=this.selectedRestaurant.parametres?.some((p:any) =>
          p.type === 'etat_paiement_acompte_reservation' &&
          p.est_actif 
        )
      
      this.paymentRestoActive = (paramrestoactif )?true:false;
      console.log('this.selectedRestaurant',this.selectedRestaurant)
      console.log('this.paymentRestoActive',this.paymentRestoActive)

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
          fullName: 'Table '+table.nb_places + ' personnes - '+table.ZoneTable.titre
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
  };

  selected_table:any
  couvertsInsuffisants = false;
  placeSupTableLimit = false;
  couvertsEtPlacesValidator() {
   
    

    const nbCouverts = this.formData.get('nb_couverts')?.value;
    const nbPersonnes = this.formData.get('nombre_de_personnes')?.value;
    const table_id = this.formData.get('table_id')?.value;

    if (nbCouverts == null || nbPersonnes == null) {
      this.couvertsInsuffisants = false;
      return;
    }

    if(table_id){
      this.selected_table = this.allTables.filter((table:any) =>
        table.id === table_id
      )[0];
      this.placeSupTableLimit = nbPersonnes > this.selected_table.nb_places;
      console.log('selected_table',this.selected_table)

      
    }

    this.couvertsInsuffisants = nbCouverts < nbPersonnes;


    console.log('placeSupTableLimit',this.placeSupTableLimit)
    console.log('couvertsInsuffisants',this.couvertsInsuffisants)
  }

  final_reservation:any

  next(){
    let res = this.valider_formulaire_etape(this.current_step)
    if(this.current_step<4 && res){
      if(this.current_step==2){
        this.onSubmit()
      }
      this.progression+=33
      this.current_step++
    }
    
  }
  prec(){
    if(this.current_step>1){
      this.progression-=33
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
          console.log('final_reservation',res)
          console.log('this.paymentRestoActive',this.paymentRestoActive)
          if(this.paymentRestoActive){
            this.get_pay_link()
          }
          
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
          this.notificationsService.error(err.error.message,"Echec")
          console.log(err.error.message)
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
      

      this.crudSaasService.getReservationDatasBySocieteId(id).subscribe({
        next: (res) => {
          console.log('getReservationDataBySocieteId',res)
          this.societeData=res.societe//ereur La propriété 'societe' n'existe pas sur le type 'any[]'
          this.set_all_creneaux(res.creneaux)//ereur La propriété 'creneaux' n'existe pas sur le type 'any[]'
          this.set_all_restaurants(res.restaurants)//ereur La propriété 'restaurants' n'existe pas sur le type 'any[]'
          this.set_all_services(res.services)//ereur La propriété 'services' n'existe pas sur le type 'any[]'
          this.set_all_tables(res.tables)//ereur La propriété 'tables' n'existe pas sur le type 'any[]'
          this.set_all_tags(res.tags)//ereur La propriété 'tags' n'existe pas sur le type 'any[]'

          this.load_restaurant(this.restaurantID)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération","Echec")
        }
      });

      
    }

    get_pay_link(){
      
      this.crudSaasService.getStripePaymentLinkForReservation(this.restaurantID,this.final_reservation).subscribe({
        next: (res) => {
          console.log('Lien de paiement ',res)
          this.urlPayment = res.url
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération","Echec")
        }
      });
    }
  
    set_all_restaurants(res:any){
      
          this.restaurants=res.filter((r:any) =>
            r.societe_id === this.societe_id &&
            r.parametres?.some((p:any) =>
              p.type === 'etat_des_reservations' &&
              p.est_actif &&
              p.valeur == 1
            )
          );
          this.allRestaurants=res.filter((r:any) =>
            r.societe_id === this.societe_id &&
            r.parametres?.some((p:any) =>
              p.type === 'etat_des_reservations' &&
              p.est_actif &&
              p.valeur == 1
            )
          );
          console.log("getRestaurants",this.allRestaurants)
        
      
    }


    set_all_creneaux(res:any){
     
          this.crenaux=res.filter((creneau:any) =>
            creneau.societe_id === this.societe_id
          ).map((creneau:any) => ({
            ...creneau,
            fullName: creneau.heure_debut + ' - ' + creneau.heure_fin
          }));
          this.allCrenaux=res.filter((creneau:any) =>
            creneau.societe_id === this.societe_id
          ).map((creneau:any) => ({
            ...creneau,
            fullName: creneau.heure_debut + ' - ' + creneau.heure_fin
          }));

          console.log("getCreneaux",this.allCrenaux)
       
    }


    set_all_services(res:any){
      
          this.services=res.filter((service:any) =>
            service.societe_id === this.societe_id
          );
          this.allServices=res.filter((service:any)  =>
            service.societe_id === this.societe_id
          );

          console.log("getServices",this.allServices)
       
    }

     set_all_tags(res:any){
      
          this.tags=res.filter((tag:any) =>
            tag.societe_id === this.societe_id
          );
          this.allTags=res.filter((tag:any) =>
            tag.societe_id === this.societe_id
          );

          console.log("getTags",this.allTags)
        
    }

    set_all_tables(res:any){
     
          this.tables=res.filter((table:any) =>
            table.societe_id === this.societe_id
          ).map((table:any) => ({
            ...table,
            fullName: 'Table '+table.nb_places + ' personnes - '+table.ZoneTable.titre 
          }));

          this.allTables=res.filter((table:any) =>
            table.societe_id === this.societe_id
          ).map((table:any) => ({
            ...table,
            fullName: 'Table '+table.nb_places + ' personnes - '+table.ZoneTable.titre  
          }));

          console.log("getTables",this.allTables)
        
    }
  
   

  stepClass(step: number) {
    return {
      current: this.current_step === step,
      'to-come': this.current_step < step,
      visited: this.current_step > step
    };
  }

  heure_pas_dans_creneau=false

  valider_formulaire_etape(num_etape: number): boolean {
    let champs: string[] = [];

    switch (num_etape) {
      case 2:
        champs = ['nom', 'prenom', 'email', 'telephone'];
        break;

      case 3:
        return true
        break;

      case 1:
        champs = [
          'date_reservation',
          'heure_reservation',
          'nombre_de_personnes',
          'service_id',
          'table_id',
          'creneau_id'
        ];
        let heure_dans_limites = this.verif_heure_dans_limites()
         let date_passee = this.dateHeureFutureValidator()
         this.date_passee = !date_passee
          let heure_not_in_horaires_resto = this.heureIsInHorairesSelectedRestoValidator()
        this.heure_not_in_horaires_resto = !heure_not_in_horaires_resto
        if(!heure_dans_limites || this.couvertsInsuffisants || this.placeSupTableLimit || this.date_passee || this.heure_not_in_horaires_resto){
          champs.forEach(champ => {
            this.formData.get(champ)?.markAsTouched();
            this.formData.get(champ)?.updateValueAndValidity();
          });
          return false;
        }
        break;
      case 4:
        return true
    }

    //  Marquer les champs comme touchés
    champs.forEach(champ => {
      this.formData.get(champ)?.markAsTouched();
      this.formData.get(champ)?.updateValueAndValidity();
    });

    //  Vérifier validité
    return champs.every(champ => this.formData.get(champ)?.valid);
  }

  verif_heure_dans_limites(): boolean {
    console.log('verif heure dans chrono')

    const heure = this.formData.get('heure_reservation')?.value;
    const creneau_id = this.formData.get('creneau_id')?.value;

    if (!heure || !creneau_id) return false;

    //  trouver le créneau
    const creneau = this.crenaux.find(c => c.id == creneau_id);

    if (!creneau) return false;

    //  convertir heure sélectionnée → minutes
    const heureSelected =
      heure.hour * 60 + heure.minute;

    //  convertir "15:00" → minutes
    const [hDebut, mDebut] = creneau.heure_debut.split(':').map(Number);
    const [hFin, mFin] = creneau.heure_fin.split(':').map(Number);

    const debut = hDebut * 60 + mDebut;
    const fin = hFin * 60 + mFin - 20;// si 22:00 il peux au max 21:40

    // ✅ vérification
    const isValid = heureSelected >= debut && heureSelected <= fin;

    this.heure_pas_dans_creneau = !isValid;

    console.log('verif heure dans chrono',isValid)
    

    return isValid;
  }

  heure_not_in_horaires_resto = false
  heureIsInHorairesSelectedRestoValidator() {
    
    const heureDebut =this.selectedRestaurant.heure_debut //string 12:00
    const heureFin =this.selectedRestaurant.heure_fin //string 20:00
    const time = this.formData.get('heure_reservation')?.value;
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

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    alert('Copied');
  }
 

  date_passee=false
  dateHeureFutureValidator() {
    

      const date = this.formData.get('date_reservation')?.value;
      const time = this.formData.get('heure_reservation')?.value;

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
  
  

}
