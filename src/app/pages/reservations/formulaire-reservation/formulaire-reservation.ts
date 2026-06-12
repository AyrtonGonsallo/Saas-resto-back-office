import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
horairesRestaurant:any[]
minDate: NgbDateStruct;
jour_choisi = ''
tables_multiple = false

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
      duree_reservation: ['', [, ]], //etape 3
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
      tables_id: [[], Validators.required], //etape 3
      service_id: [null, Validators.required], //etape 3
      tags: [null, ], //etape 3
      societe_id: [this.societe_id, Validators.required], //pas d'etape 
      restaurant_id: [this.restaurantID, Validators.required], //etape 2
      client_id: [null, ], //pas d'etape 
    });

    

    

    this.formData.get('tables_id')?.valueChanges.subscribe(() => {
      this.couvertsEtPlacesValidator();
    });

    this.formData.get('nb_couverts')?.valueChanges.subscribe(() => {
      this.couvertsEtPlacesValidator();
    });

     this.formData.get('heure_reservation')?.valueChanges.subscribe(() => {
      this.find_and_set_service();
    });
    

    this.formData.get('nombre_de_personnes')?.valueChanges.subscribe((nombre) => {

      const currentCouverts = this.formData.get('nb_couverts')?.value;

      // Remplir seulement si vide ou inférieur
      if (!currentCouverts || currentCouverts < nombre) {
        this.formData.get('nb_couverts')?.setValue(nombre, {
          emitEvent: false
        });
      }

      this.couvertsEtPlacesValidator();
    });


    this.formData.get('date_reservation')?.valueChanges.subscribe((date) => {

      this.get_selected_day_and_horaire(date)
      
    });
    

  }
  
  param_resto_ecart_heures:any
  param_resto_duree_blocage_table:any
  param_resto_fusionner_les_tables_pour_reservation:any

  load_restaurant(restaurant_id:number) {

      console.log("restaurant_id choisi:", restaurant_id);
      this.restaurantID = restaurant_id
      this.selectedRestaurant = this.restaurants.filter((r:any) =>
        r.id === restaurant_id
      )[0];
      let paramrestoactif = this.selectedRestaurant.parametres?.some((p:any) =>
        p.type === 'etat_paiement_acompte_reservation' &&
        p.est_actif 
      )

      this.param_resto_ecart_heures = this.selectedRestaurant.parametres?.find((p:any) =>
        p.type === 'ecart_entre_heure_actuelle_et_heure_reservation' &&
        p.est_actif 
      )

      this.param_resto_duree_blocage_table = this.selectedRestaurant.parametres?.find((p:any) =>
        p.type === 'duree_blocage_table' 
      )

      if(this.param_resto_duree_blocage_table){
        
        const duree_minutes = this.convertToMinutes(
          Number(this.param_resto_duree_blocage_table.valeur),
          this.param_resto_duree_blocage_table.unite_de_temps
        );
        this.formData.get('duree_reservation')?.setValue(duree_minutes, {
          emitEvent: false
        });
      }


      this.param_resto_fusionner_les_tables_pour_reservation = this.selectedRestaurant.parametres?.find((p:any) =>
        p.type === 'fusionner_les_tables_pour_reservation' 
      )

      if (this.param_resto_fusionner_les_tables_pour_reservation.est_actif) {
        this.tables_multiple = true;
        console.log('tables fusionnables');
      } else {
        this.tables_multiple = false;
      }

      let horaires_reservation = this.get_sorted_horaires_by_day()
      
      this.paymentRestoActive = (paramrestoactif )?true:false;
      console.log('this.selectedRestaurant',this.selectedRestaurant)
      console.log('this.paymentRestoActive',this.paymentRestoActive)

      this.horairesRestaurant = horaires_reservation

      console.log('this.horairesRestaurant',this.horairesRestaurant)

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

    
        this.services=this.allServices.filter(service =>
          service.societe_id === this.societe_id &&
          service.restaurant_id === restaurant_id
        );

        this.tags=this.allTags.filter(tag =>
          tag.societe_id === this.societe_id &&
          tag.restaurant_id === restaurant_id
        );
      }

      this.disabledDates = JSON.parse(this.selectedRestaurant.jours_de_fermeture)
      console.log("this.disabledDates",this.disabledDates)
  };

  selected_table:any
  couvertsInsuffisants = false;
  placeSupTableLimit = false;
  
  couvertsEtPlacesValidator() {

  const nbCouverts = this.formData.get('nb_couverts')?.value;
  const nbPersonnes = this.formData.get('nombre_de_personnes')?.value;
  const tables_id = this.formData.get('tables_id')?.value;

  this.couvertsInsuffisants = false;
  this.placeSupTableLimit = false;

  if (nbCouverts == null || nbPersonnes == null) {
    return;
  }

  // Vérification des couverts
  this.couvertsInsuffisants = nbCouverts < nbPersonnes;

  // Vérification des places des tables
  if (tables_id) {

    let nbPlaces = 0;

    // Mode multi-tables
    if (Array.isArray(tables_id)) {

      const selectedTables = this.allTables.filter((table: any) =>
        tables_id.includes(table.id)
      );

      nbPlaces = selectedTables.reduce(
        (total: number, table: any) => total + table.nb_places,
        0
      );

      this.selected_table = selectedTables;

    } 
    // Mode table unique
    else {

      this.selected_table = this.allTables.find(
        (table: any) => table.id === tables_id
      );

      nbPlaces = this.selected_table?.nb_places || 0;
    }

    this.placeSupTableLimit = nbPersonnes > nbPlaces;

    console.log('selected_table', this.selected_table);
    console.log('nbPlaces', nbPlaces);
  }

  console.log('placeSupTableLimit', this.placeSupTableLimit);
  console.log('couvertsInsuffisants', this.couvertsInsuffisants);
}

  final_reservation:any

  async next(){
    let res = this.valider_formulaire_etape(this.current_step)
    if(this.current_step<4 && res){
      if(this.current_step==2){
        const success = await this.onSubmit();
        console.log('success',success)

        if (!success) {
          return;
        }
      }
      this.progression+=33
      this.current_step++

      if(this.current_step === 4){
        this.button_suiv_text = 'Terminer'
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Votre réservation a bien été enregistrée',
        });
        
        setTimeout(() => {
          this.close();
        }, 12000);
      }
      
    }

    else if(this.current_step === 4){
      window.location.reload();
    }
    
  }

  
  prec(){
    if(this.current_step>1){
      this.progression-=33
      this.current_step--
    }

     if(this.current_step < 4){
      this.button_suiv_text = 'Suivant'
    }

    console.log("this.current_step",this.current_step)
  }

    async onSubmit() : Promise<boolean>{
      let res=false
      if (this.formData.invalid) {
        this.notificationsService.error("Formulaire invalide","Echec")
        this.formData.markAllAsTouched();
        res=false;
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
          res=true;
          this.progression+=33
          this.current_step++
          
        },
        error: (err) => {
          this.notificationsService.error(err.error.message,"Echec")
          console.log(err.error.message)
          res=false;
        }
      });
      
      return res;
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
              p.est_actif 
            )
          );
          this.allRestaurants=res.filter((r:any) =>
            r.societe_id === this.societe_id &&
            r.parametres?.some((p:any) =>
              p.type === 'etat_des_reservations' &&
              p.est_actif 
            )
          );
          console.log("getRestaurants",this.allRestaurants)
        
      
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
          'tables_id',
        ];
        
        if( this.couvertsInsuffisants || this.placeSupTableLimit ){
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

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    alert('lien de paiement copié !');
  }

  openPayment(url: string) {
   if (url) {
     window.open(url, '_blank'); // ouvre dans un nouvel onglet
    }
  }
 

  
  
  disabledDates: string[] =  []

  isDateDisabled = (date: NgbDateStruct): boolean => {

    const current =
      `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;

    return this.disabledDates.includes(current);
  };

  close(){
    //fermer la popup qui contien la page le touton close est pas dans angular
     window.parent.postMessage({
      action: 'closeReservationPopup'
    }, '*');
  }

  get_horaire_label(horaire:any){
    let heures=''
    if(horaire.ferme){
      heures='fermé';
    }else{
      heures=`${horaire.heure_debut} - ${horaire.heure_fin}`;
    }
    let result = `${horaire.jour} ${horaire.Service?.type} : ${heures}`;
    return result
  }

  ordreJours = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
  ];

  get_sorted_horaires_by_day(){
    let sorted_horaires_reservation = this.selectedRestaurant.horaires
    ?.filter((p: any) => p.type === 'Réservation')
    .sort(
      (a: any, b: any) =>
        this.ordreJours.indexOf(a.jour) - this.ordreJours.indexOf(b.jour)
    );

    return sorted_horaires_reservation;
  }


  
  heures_possibles: string[] = [];

get_selected_day_and_horaire(date: any) {

  this.heures_possibles = [];

  if (!date) {
    return;
  }

  const jsDate = new Date(date.year, date.month - 1, date.day);

  this.jour_choisi = jsDate.toLocaleDateString('fr-FR', { weekday: 'long' });

  const horaireMidiSelectedJour = this.horairesRestaurant.find(
    (p: any) =>
      p.jour.toLowerCase() === this.jour_choisi.toLowerCase() &&
      p.Service.type.toLowerCase() === 'midi'
  );

  const horaireSoirSelectedJour = this.horairesRestaurant.find(
    (p: any) =>
      p.jour.toLowerCase() === this.jour_choisi.toLowerCase() &&
      p.Service.type.toLowerCase() === 'soir'
  );

  const horaireAutreSelectedJour = this.horairesRestaurant.find(
    (p: any) =>
      p.jour.toLowerCase() === this.jour_choisi.toLowerCase() &&
      !['midi', 'soir'].includes(p.Service.type.toLowerCase())
  );

  if(horaireMidiSelectedJour||horaireSoirSelectedJour){
    this.fill_current_horiaires(horaireMidiSelectedJour,jsDate)
    this.fill_current_horiaires(horaireSoirSelectedJour,jsDate)
  }else{
    console.log('pas de service midi et soir')
    this.fill_current_horiaires(horaireAutreSelectedJour,jsDate)
  }
  

    
  console.log('duree_blocage_table  :', this.param_resto_duree_blocage_table.valeur,this.param_resto_duree_blocage_table.unite_de_temps); 
  console.log('ecart min entre heure reser et heure actuelle :', this.param_resto_ecart_heures.valeur,this.param_resto_ecart_heures.unite_de_temps); 
  console.log('Jour :', this.jour_choisi); 
  console.log('Heure actuelle :', new Date().toLocaleTimeString('fr-FR')); 
  
}



fill_current_horiaires(horaireSelectedJour:any,jsDate:any){
  if (!horaireSelectedJour || horaireSelectedJour.ferme) {
    return;
  }

  const hDeb = this.timeToMinutes(horaireSelectedJour.heure_debut);
  const hFin = this.timeToMinutes(horaireSelectedJour.heure_fin);

  // Durée de blocage
  const dureeBlocage = this.convertToMinutes(
    Number(this.param_resto_duree_blocage_table.valeur),
    this.param_resto_duree_blocage_table.unite_de_temps
  );

  // Écart minimum avant réservation
  const ecartReservation = this.convertToMinutes(
    Number(this.param_resto_ecart_heures.valeur),
    this.param_resto_ecart_heures.unite_de_temps
  );

  let heureMinReservation = hDeb;

  // Si réservation aujourd'hui
  const now = new Date();
  const isToday =
    now.getFullYear() === jsDate.getFullYear() &&
    now.getMonth() === jsDate.getMonth() &&
    now.getDate() === jsDate.getDate();

  if (isToday) {
    heureMinReservation =
      now.getHours() * 60 +
      now.getMinutes() +
      ecartReservation;
  }

  // Arrondi à la demi-heure supérieure
  heureMinReservation =
    Math.ceil(heureMinReservation / 30) * 30;


    console.log('heureMinReservation',heureMinReservation)

  // Créneaux de 30 min
  for (
    let minutes = Math.max(hDeb, heureMinReservation);
    minutes + dureeBlocage <= hFin;
    minutes += 30
  ) {
    this.heures_possibles.push(
      this.minutesToTime(minutes)
    );
  }

  console.log('horaireSelectedJour :', horaireSelectedJour);
  console.log('heures_possibles',this.heures_possibles);
}

private timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

private minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');

  const m = (minutes % 60)
    .toString()
    .padStart(2, '0');

  return `${h}:${m}`;
}

private convertToMinutes(
  valeur: number,
  unite: string
): number {

  switch (unite) {

    case 'secondes':
      return valeur / 60;

    case 'minutes':
      return valeur;

    case 'heures':
      return valeur * 60;

    case 'jours':
      return valeur * 24 * 60;

    default:
      return valeur;
  }
}


find_and_set_service() {

  const heureReservation = this.formData.get('heure_reservation')?.value;

  if (!heureReservation || !this.jour_choisi) {
    return;
  }

  // Tous les horaires du jour
  const horairesJour = this.horairesRestaurant.filter(
    (p: any) =>
      p.jour.toLowerCase() === this.jour_choisi.toLowerCase()
  );

  const heureReservationMinutes =
    this.timeToMinutes(heureReservation);

  // Trouver l'horaire correspondant
  const horaireSelectionne = horairesJour.find((h: any) => {

    const hDeb = this.timeToMinutes(h.heure_debut);
    const hFin = this.timeToMinutes(h.heure_fin);

    return (
      heureReservationMinutes >= hDeb &&
      heureReservationMinutes <= hFin
    );
  });

  if (!horaireSelectionne) {
    console.warn(
      'Aucun service trouvé pour',
      heureReservation
    );
    return;
  }

  console.log('Service trouvé', horaireSelectionne.Service);

  this.formData.get('service_id')?.setValue(
    horaireSelectionne.service_id,
    { emitEvent: false }
  );
}


get_tables_label(tables:any){
  let res=""
  tables.forEach((table:any) => {
    res+= `${table.nb_places} personnes, ${table.ZoneTable.titre}<br>`;
  });
  return res;
  
}


}
