import { Component, inject, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDateStruct, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environment';
import { PanierService } from '../../../shared/services/click-and-collect/panier.service';

@Component({
  selector: 'app-formulaire-click-and-collect',
  imports: [RouterModule,ReactiveFormsModule,CommonModule,FormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './formulaire-click-and-collect.html',
  styleUrl: './formulaire-click-and-collect.scss',
})
export class FormulaireClickAndCollect {

  public imagesUrl = environment.imagesUrl
  private modalService = inject(NgbModal);
    
  formData!: FormGroup;
  button_suiv_text='Suivant'
  button_prec_text='Précédent'
  current_step=1
  societe_id=0
  progression=0
  restaurantID = 0
  menuID = 0
  selectedMenu : any
  selectedRestaurant : any
  urlPayment = null
  paymentRestoActive = true
  livraisonRestoActive = false
  minDate: NgbDateStruct;
  search_term = ''
  produits_groupes_par_cat : any[]
  panierItems: any[] = [];
  horairesRestaurant:any[]
  totalPanier: number = 0;
  jour_choisi = ''
  

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService,private panierService:PanierService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
  

    
  ngOnInit(): void {

    const today = new Date();

    this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.restaurantID = parseInt(this.route.snapshot.paramMap.get('restaurant_id')??'');
   

    this.societe_id = parseInt(this.route.snapshot.paramMap.get('societe_id')??'');
    this.load_societe_data(this.societe_id )
    
    
    this.formData = this.fb.group({
      nom: ['', Validators.required], //etape 1
      prenom: ['', Validators.required], //etape 1
      email: ['', [Validators.required, Validators.email]], //etape 1
      telephone: ['', [Validators.required,Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]], //etape 1
      adresse_livraison: [null, [,]],
      date_retrait: [null, [Validators.required, ]], //etape 3
      heure_retrait: [null, [Validators.required, ]], //etape 3     
      societe_id: [this.societe_id, Validators.required], //pas d'etape 
      restaurant_id: [null, Validators.required], //etape 2
      client_id: [null, ], //pas d'etape 
    });

    this.refreshPanier();

     this.formData.get('date_retrait')?.valueChanges.subscribe((date) => {

      this.get_selected_day_and_horaire(date)
      
    });

 
    
  }

  final_commande:any

  async next(){
    let res = this.valider_formulaire_etape(this.current_step)
    if(this.current_step<6 && res){
      if(this.current_step==3){
        const success = await this.onSubmit();
        console.log('success',success)
        if (!success) {
          return;
        }
      }else if(this.current_step==4 && this.paymentRestoActive){
        const is_payed = await this.isPayed();
        console.log('is_payed',is_payed)
        if (!is_payed) {
          return;
        }
      }
      else if(this.current_step==4 && !this.paymentRestoActive){
        this.progression+=25
        this.current_step++
        this.close_and_timeout()
      }
      else if (this.current_step==5){
        this.close_and_timeout()
      }else{
        this.progression+=25
        this.current_step++

      }
      
      console.log('this.current_step',this.current_step)
    }else if (this.current_step == 6) {
      window.location.reload();
    }
  }


  close_and_timeout(){
    this.button_suiv_text = 'Terminer';
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
      title: 'Votre commande a bien été enregistrée',
    });
    
    setTimeout(() => {
      this.close();
    }, 12000);
  }


  prec(){
    if(this.current_step>1){
      this.progression-=25
      this.current_step--
    }

    if(this.current_step < 5){
      this.button_suiv_text = 'Suivant'
    }
    console.log("this.current_step",this.current_step)
  }

  see_panier=false
  elements_panier:any
  see_card(){
    this.elements_panier = this.panierService.get_panier();
    this.see_panier=!this.see_panier
    console.log('this.elements_panier',this.elements_panier)
  }

  async onSubmit() : Promise<boolean>{
    let res=false
    
    if (this. formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this. formData.markAllAsTouched();
      res=false;
    }
    const elements_panier = this.panierService.get_panier();

    const payload = {
      commandeDatas: this.formData.value,
      elements_panier: elements_panier
    };

    console.log('payload', payload);

    
    
    this.crudSaasService.ajouterCommande(payload).subscribe({
      next: (res) => {
        this.final_commande=res
        console.log('final_commande',res)
        console.log('this.paymentRestoActive',this.paymentRestoActive)
        if(this.paymentRestoActive){
          this.get_pay_link()
        }
        res=true;
        
        this.progression+=25
        this.current_step++
      },
      error: (err) => {
        res=false;
        this.notificationsService.error(err.error.message,"Echec")
        console.log(err.error.message)
      }
    });


    // appel API ici
    return res;
  }


  async isPayed() : Promise<boolean>{
    let result=false
    

    
    this.crudSaasService.getPaiementByResCommID(null,this.final_commande.id).subscribe({
      next: (res) => {
        console.log('paiement',res)
        console.log('paiement',this.paymentRestoActive)
        result=true;
        this.progression+=25
        this.current_step++
        console.log("paye",this.current_step)
        this.next()
        
      },
      error: (err) => {
        this.notificationsService.error(err.error.message,"Echec")
        console.log(err.error.message)
        result=false;
      }
    });
    
    return result;
    // appel API ici
  }

  param_delai_avant_fermetture_commandes:any
  param_commande_a_l_avance:any 
  param_delai_de_preparation:any
  resto_inactif=false

  choisirRestaurant(restaurant_id:number){

    this.restaurantID = restaurant_id
    this.selectedRestaurant = this.restaurants.filter((r:any) =>
      r.id === restaurant_id
    )[0];

    if(!this.selectedRestaurant){
        this.resto_inactif=true
        return
      }

    let paramrestoactif=this.selectedRestaurant.parametres?.some((p:any) =>
      p.type === 'etat_paiement_acompte_click_and_collect' &&
      p.est_actif 
    )
    let paramlivraisonrestoactif=this.selectedRestaurant.parametres?.some((p:any) =>
      p.type === 'livraison_click_and_collect' &&
      p.est_actif 
    )
    this.param_delai_avant_fermetture_commandes = this.selectedRestaurant.parametres?.find((p:any) =>
      p.type === 'delai_avant_fermetture_commandes' &&
      p.est_actif 
    )
    this.param_commande_a_l_avance = this.selectedRestaurant.parametres?.find((p:any) =>
      p.type === 'commande_a_l_avance' &&
      p.est_actif 
    )
    this.param_delai_de_preparation = this.selectedRestaurant.parametres?.find((p:any) =>
      p.type === 'delai_de_preparation' &&
      p.est_actif 
    )

    console.log('this.param_delai_avant_fermetture_commandes',this.param_delai_avant_fermetture_commandes)
    console.log('this.param_commande_a_l_avance',this.param_commande_a_l_avance)
  

   
    let horaires_reservation = this.get_sorted_horaires_by_day()
    
    this.paymentRestoActive = (paramrestoactif )?true:false;
    this.livraisonRestoActive = (paramlivraisonrestoactif )?true:false;
    console.log('this.selectedRestaurant',this.selectedRestaurant)
    console.log('this.paymentRestoActive',this.paymentRestoActive)
    console.log('this.livraisonRestoActive',this.livraisonRestoActive)
    
    this.horairesRestaurant = horaires_reservation
    console.log('this.horairesRestaurant',this.horairesRestaurant)
    
    const adresseCtrl = this.formData.get('adresse_livraison');

    if (this.livraisonRestoActive) {
      adresseCtrl?.setValidators([Validators.required]);
    } else {
      adresseCtrl?.clearValidators();
    }

    adresseCtrl?.updateValueAndValidity();

    if (!restaurant_id) {
      this.menus = this.allMenus;
    } else {
      this.formData.get('restaurant_id')?.setValue(restaurant_id, { emitEvent: false });
      this.menus = this.allMenus.filter(menu =>
        menu.societe_id === this.societe_id &&
        menu.restaurant_id === restaurant_id
      );

    }

    this.disabledDates = JSON.parse(this.selectedRestaurant.jours_de_fermeture)
    console.log("this.disabledDates",this.disabledDates)

 
    this.produits=this.allProduits.filter((produit:any) =>
      produit.restaurant_id === this.restaurantID
    );

    this.menus=this.allMenus.filter((menu:any) =>
      menu.restaurant_id === this.restaurantID
    );

    this.produits_groupes_par_cat = this.group_by_categorie(this.produits)
    console.log("this.produits_groupes_par_cat",this.produits_groupes_par_cat)
    console.log("this.menus",this.menus)

    this.next()

    

  }


  openPayment(url: string) {
   if (url) {
     window.open(url, '_blank'); // ouvre dans un nouvel onglet
    }
  }


  produitActuel: any = null;
  variationActuelle: any = null;
  quantite_produit_actuel = 1;
  formVariations!: FormGroup;
  formProduit!: FormGroup;
    formMenu!: FormGroup;
  groups: any[] = [];
  total_elements_panier=0

  ouvrirChoixVariationsModal(variationsChoiceTemplate: TemplateRef<NgbModal>,produit:any) {
    this.quantite_produit_actuel = 1;
    this.produitActuel=produit
    let existant = this.panierService.getElementDatas(produit.id)
    console.log('existant',existant)

    const variationsGroup: any = {};

    this.groups = this.grouperVariations(produit.variations)
    console.log('group',this.groups)

    this.groups.forEach(group => {
      variationsGroup[group.categorie.id] = [
        null,
        group.categorie.obligatoire ? Validators.required : []
      ];
    });

    this.formVariations = this.fb.group({
      variations: this.fb.group(variationsGroup), // ici le regroupement
      quantite: [(existant)?existant.quantite:1, [Validators.required, Validators.min(1)]],
      prix_ht: [this.produitActuel.prix_ht],
      titre: [this.produitActuel.titre],
      tva: [this.produitActuel.tva]
    });

    this.modalService.open(variationsChoiceTemplate);
  }

  ouvrirAjouterProduitModal(ajouterProduitTemplate: TemplateRef<NgbModal>,produit:any) {
    let existant = this.panierService.getElementDatas(produit.id)
    console.log('produit existant',existant)
    this.quantite_produit_actuel = 1;
    this.produitActuel=produit

    const formControls: any = {};

    formControls['quantite'] = [(existant)?existant.quantite:1, [Validators.required, Validators.min(1)]];
    formControls['prix_ht'] = [this.produitActuel.prix_ht,];
    formControls['titre'] = [this.produitActuel.titre,];
    formControls['tva'] = [this.produitActuel.tva,];

    this.formProduit = this.fb.group(formControls);

    
    this.modalService.open(ajouterProduitTemplate);
    
  }


  ouvrirAjouterMenuModal(ajouterMenuTemplate: TemplateRef<NgbModal>,menu:any) {
    let existant = this.panierService.getElementDatas(menu.id)
    console.log('menu existant',existant)
    this.quantite_produit_actuel = 1;
    this.produitActuel=menu

    const formControls: any = {};

    formControls['quantite'] = [(existant)?existant.quantite:1, [Validators.required, Validators.min(1)]];
    formControls['prix_ht'] = [(this.produitActuel.offre_promo)?this.produitActuel.prix_promo_ht:this.produitActuel.prix_ht,];
    formControls['titre'] = [this.produitActuel.titre,];
    formControls['tva'] = [this.produitActuel.tva,];

    this.formMenu = this.fb.group(formControls);

    
    this.modalService.open(ajouterMenuTemplate);
    
  }

  ajouter_produit(){
    console.log('formProduit',this.formProduit.value);
    let res = this.panierService.ajouter_produit(this.produitActuel,this.formProduit.value)
    this.total_elements_panier=this.panierService.getTotalElements()
    if(res){
      /*
       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Produit ajouté au panier',
          showConfirmButton: false,
        });
      setTimeout(() => {
      }, 1000);
      */
      this.refreshPanier(); 
      this.modalService.dismissAll()
    }
   
  }

  ajouter_menu(){
    console.log('formMenu',this.formMenu.value);
    let res = this.panierService.ajouter_menu(this.produitActuel,this.formMenu.value)
    this.total_elements_panier=this.panierService.getTotalElements()
    if(res){
      /*
       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Menu ajouté au panier',
          showConfirmButton: false,
        });
      setTimeout(() => {
      }, 1000);
      */
      this.refreshPanier(); 
      this.modalService.dismissAll()
    }
   
  }

  ajouter_variation(){
    console.log('formVariations',this.formVariations.value);
    let res = this.panierService.ajouter_variation(this.produitActuel,this.formVariations.value)
    this.total_elements_panier=this.panierService.getTotalElements()
    if(res){
      /*
       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Produit ajouté au panier',
          showConfirmButton: false,
        });
      setTimeout(() => {
      }, 1000);
      */
      this.refreshPanier(); 
      this.modalService.dismissAll()
    }
  }

  retirer_produit(pid:number){
    let res = this.panierService.retirer_produit(pid)
    this.total_elements_panier=this.panierService.getTotalElements()
    if(res){

       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Produit supprimé du panier',
          showConfirmButton: false,
        });
      setTimeout(() => {
      }, 1000);
      this.refreshPanier();
    }
  }

  retirer_menu(pid:number){
    let res = this.panierService.retirer_menu(pid)
    this.total_elements_panier=this.panierService.getTotalElements()
    if(res){
       Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Menu supprimé du panier',
          showConfirmButton: false,
        });
      setTimeout(() => {
      }, 1000);
      this.refreshPanier();
    }
  }

  is_product_in_cart(pid:number){
    return this.panierService.isProduitDansPanier(pid)
  }

  is_menu_in_cart(pid:number){
    return this.panierService.isMenuDansPanier(pid)
  }

  recherche() {
    const term = this.search_term?.toLowerCase() || '';

    this.restaurants = this.allRestaurants.filter((r: any) =>

      // champs simples
      r.nom?.toLowerCase().includes(term) ||
      r.adresse?.toLowerCase().includes(term) ||
      r.ville?.toLowerCase().includes(term) ||

      // tableau types_de_cuisine
      r.types_de_cuisine?.some((type: any) =>
        type.titre?.toLowerCase().includes(term)
      )

    );
  }

  


  restaurants:any[]
  allRestaurants:any[]
  societes:any[]
  societeData:any
  menus:any[]
  allMenus:any[]
  produits:any[]
  allProduits:any[]


  load_societe_data(id:number){
    
    this.crudSaasService.getCommandeDatasBySocieteId(id).subscribe({
      next: (res) => {
        console.log('getClickAndCollectDataBySocieteId',res)
        this.societeData=res.societe//ereur La propriété 'societe' n'existe pas sur le type 'any[]'
      
        this.set_all_restaurants(res.restaurants)//ereur La propriété 'restaurants' n'existe pas sur le type 'any[]'
        this.set_all_menus(res.menus)//ereur La propriété 'services' n'existe pas sur le type 'any[]'
        this.set_all_produits(res.produits)
      
         if(this.restaurantID){
          this.choisirRestaurant(this.restaurantID)
        }
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

    
  }

  get_pay_link(){
    
    this.crudSaasService.getStripePaymentLinkForCommande(this.restaurantID,this.final_commande).subscribe({
      next: (res) => {
        console.log('Lien de paiement',res)
        this.urlPayment = res.url
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });
  }

  set_all_restaurants(res:any){
    
    this.allRestaurants = res.filter((r:any) =>
      r.societe_id === this.societe_id &&
      r.parametres?.some((p:any) =>
        p.type === 'etat_du_click_and_collect' &&
        p.est_actif 
      )
    );
    this.restaurants = this.allRestaurants;
    console.log("getRestaurants",this.allRestaurants)

  }

/*
  set_all_menus(res:any){
    
    this.menus=res.filter((menu:any) =>
      menu.societe_id === this.societe_id
    );
    this.allMenus=res.filter((menu:any) =>
      menu.societe_id === this.societe_id
    );
    console.log("getMenus",this.allMenus)
      
  } */

  set_all_menus(res: any) {
    this.allMenus = res.filter((menu: any) =>
      menu.societe_id === this.societe_id
    );

    this.menus = this.allMenus.map((m: any) => ({
      ...m,
      showMore: false
    }));
  }
  

  set_all_produits(res:any){
    
    this.allProduits=res.filter((produit:any) =>
      produit.societe_id === this.societe_id
    );
    this.produits=this.allProduits;
    this.produits.forEach((p: any) => {
      p.showMore = false;
    });
    console.log("getProduits",this.allProduits)
      
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
        return true

      case 2:
        return this.check_panier()

      case 3:
        //  Marquer les champs comme touchés
        champs.forEach(champ => {
          this. formData.get(champ)?.markAsTouched();
          this. formData.get(champ)?.updateValueAndValidity();
        });
        //  Vérifier validité
        return champs.every(champ => this. formData.get(champ)?.valid);

      case 4:
        return true
    }

    //  Marquer les champs comme touchés
    champs.forEach(champ => {
      this. formData.get(champ)?.markAsTouched();
      this. formData.get(champ)?.updateValueAndValidity();
    });

    //  Vérifier validité
    return champs.every(champ => this. formData.get(champ)?.valid);
  }

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    alert('lien de paiement copié !');
  }


  swal_alert(texte:string){
    Swal.fire({
      title: 'Données incomplètes',
      text: texte,
      icon: 'error',
    });
  }

  check_panier(){
    if(this.total_elements_panier<1){
      this.swal_alert('Votre panier est vide')
      return false
    }else{
      return true
    }
  }

  group_by_categorie(produits: any[]) {

    const map = new Map();

    let filtred_produits = produits.filter((p:any) =>
        p.actif === true &&
        p.stock > 1
      )

    // 1️⃣ Grouper
    filtred_produits.forEach((p) => {
      const catId = p.categorie?.id;
      const catActive = p.categorie?.est_actif;

      if (!catId) return;

      if (!catActive) return;
      

      if (!map.has(catId)) {
        map.set(catId, {
          categorie: p.categorie,
          produits: []
        });
      }

      map.get(catId).produits.push(p);
    });

    // 2️⃣ Convertir en tableau
    const result = Array.from(map.values());

    // 3️⃣ Trier par ordre croissant
    result.sort((a, b) => (a.categorie.ordre || 0) - (b.categorie.ordre || 0));

    return result;
  }

  cut_description(text: string) {
    const plainText = text.replace(/<[^>]*>/g, ''); // enlève HTML

    if (plainText.length <= 50) return plainText;

    return plainText.slice(0, 50) + '...';
  }

  grouperVariations(variations: any[]) {
    const map = new Map();

    variations.forEach(v => {
      if (v.stock<1) return;
      const cat = v.categorie;

      if (!cat) return;

      if (!map.has(cat.id)) {
        map.set(cat.id, {
          categorie: cat,
          variations: []
        });
      }

      map.get(cat.id).variations.push(v);
    });

    return Array.from(map.values());
  }

  get_class(id: number): string {
    const classes = ['primary', 'secondary', 'tertiary', 'danger', 'info'];
    return classes[id % classes.length];
  }


  get_unit_cummul_price_ht(item:any){
    let prix = 0 
    prix = item.prix_ht
    if(item.variations){
      item.variations.forEach((v:any) => {
        prix += v.prix_supplement
      });
    }
    return prix
  }

  get_cummul_price_ht(item:any){
    let prix = 0 
    prix = item.prix_ht
    if(item.variations){
      item.variations.forEach((v:any) => {
        prix += v.prix_supplement
      });
    }
    
    return prix * item.quantite
  }

  get_sous_total_price_ht(items:any){
    let prix = 0 
    items.forEach((i:any) => {
      prix += this.get_cummul_price_ht(i)
    });
    return prix
  }



  scrollToCategory(id: number) {
    const element = document.getElementById('cat-' + id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  getTotalPanier(items: any[]) {
    return items.reduce((sum, item) => {
      const prix = item.prix_ht || 0;

      const variations = item.variations || [];
      const totalVariations = variations.reduce(
        (s: number, v: any) => s + (v.prix_supplement || 0),
        0
      );

      return sum + (prix + totalVariations) * (item.quantite || 1);
    }, 0);
  }

  refreshPanier() {
    this.panierItems = this.panierService.get_panier();
    this.totalPanier = this.getTotalPanier(this.panierItems);
    this.total_elements_panier = this.panierService.getTotalElements();
  }

  disabledDates: string[] =  []

  isDateDisabled = (date: NgbDateStruct): boolean => {

    const currentDate = new Date(
      date.year,
      date.month - 1,
      date.day
    );

    // Dates explicitement désactivées
    const current =
      `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;

    if (this.disabledDates?.includes(current)) {
      return true;
    }

    // Limite commande à l'avance
    if (
      this.param_commande_a_l_avance &&
      this.param_commande_a_l_avance.est_actif
    ) {

      const valeur = Number(this.param_commande_a_l_avance.valeur);

      const maxDate = new Date();
      maxDate.setHours(0, 0, 0, 0);

      switch (this.param_commande_a_l_avance.unite_de_temps) {

        case 'jours':
          maxDate.setDate(maxDate.getDate() + valeur);
          break;

        case 'heures':
          maxDate.setHours(maxDate.getHours() + valeur);
          break;

        case 'minutes':
          maxDate.setMinutes(maxDate.getMinutes() + valeur);
          break;

        case 'secondes':
          maxDate.setSeconds(maxDate.getSeconds() + valeur);
          break;
      }

      currentDate.setHours(0, 0, 0, 0);

      if (currentDate > maxDate) {
        return true;
      }
    }

    return false;
  };


  get_product_list(produits:any[]){
    let res= ''
    produits.forEach(produit => {
      res+= `${produit.titre}`
    });
    return res

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
    ?.filter((p: any) => p.type === 'Click and collect')
    .sort(
      (a: any, b: any) =>
        this.ordreJours.indexOf(a.jour) - this.ordreJours.indexOf(b.jour)
    );

    return sorted_horaires_reservation;
  }


 close(){
    //fermer la popup qui contien la page le touton close est pas dans angular
    window.parent.postMessage({
      action: 'closeCommandePopup'
    }, '*');

  }


  
  
  heures_possibles: string[] = [];
  heures_msg=''
  pas_d_heures=false

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
  

    
  console.log('delai fermetture  :', this.param_delai_avant_fermetture_commandes.valeur,this.param_delai_avant_fermetture_commandes.unite_de_temps); 
  console.log('duree preparation :', this.param_delai_de_preparation.valeur,this.param_delai_de_preparation.unite_de_temps); 
  console.log('Jour :', this.jour_choisi); 
  console.log('Heure actuelle :', new Date().toLocaleTimeString('fr-FR')); 

   if (this.heures_possibles.length<1){
    this.heures_msg=`Aucune heure de réservation trouvée le ${this.jour_choisi}. `
    this.pas_d_heures=true
  }else{
    this.pas_d_heures=false
  }
  
}



fill_current_horiaires(horaireSelectedJour:any,jsDate:any){
  if (!horaireSelectedJour || horaireSelectedJour.ferme) {
    return;
  }

  const hDeb = this.timeToMinutes(horaireSelectedJour.heure_debut);
  const hFin = this.timeToMinutes(horaireSelectedJour.heure_fin);

  // si on femre a 18h et c'est 2h tu commande au plus a 16h
  const delaiFermetture = this.convertToMinutes(
    Number(this.param_delai_avant_fermetture_commandes.valeur),
    this.param_delai_avant_fermetture_commandes.unite_de_temps
  );

  // si 2j on est le 5 les dates du 9 + bloquees
  // si de 50min il est 12h peux commander a 12h50 au moins
  const dureePreparation = this.convertToMinutes(
    Number(this.param_delai_de_preparation.valeur),
    this.param_delai_de_preparation.unite_de_temps
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
      dureePreparation;
  }

  // Arrondi à la demi-heure supérieure
  heureMinReservation =
    Math.ceil(heureMinReservation / 30) * 30;


    console.log('heureMinReservation',heureMinReservation)

  // Créneaux de 30 min
  for (
    let minutes = Math.max(hDeb, heureMinReservation);
    minutes + delaiFermetture <= hFin;
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

 
 
}