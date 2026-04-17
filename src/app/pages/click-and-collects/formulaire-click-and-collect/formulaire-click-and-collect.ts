import { Component, inject, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  minDate: NgbDateStruct;
  search_term = ''
  produits_groupes_par_cat : any[]
  

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService,private panierService:PanierService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
  

    
  ngOnInit(): void {

    const today = new Date();

    this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    this.societe_id = parseInt(this.route.snapshot.paramMap.get('societe_id')??'');
    this.load_societe_data(this.societe_id )
    
    
    this.formData = this.fb.group({
      nom: ['', Validators.required], //etape 1
      prenom: ['', Validators.required], //etape 1
      email: ['', [Validators.required, Validators.email]], //etape 1
      telephone: ['', [Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]], //etape 1
      date_retrait: [null, [Validators.required ]], //etape 3
      heure_retrait: [null, [Validators.required ]], //etape 3     
      societe_id: [this.societe_id, Validators.required], //pas d'etape 
      restaurant_id: [null, Validators.required], //etape 2
      client_id: [null, ], //pas d'etape 
    });

 
    
  }

  final_commande:any

  next(){
    let res = this.valider_formulaire_etape(this.current_step)
    if(this.current_step<5 && res){
      this.progression+=25
      this.current_step++
      console.log(this.progression)
    }else if(this.current_step==5){
     
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
    
    if (this. formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this. formData.markAllAsTouched();
      return;
    }
    
    console.log(this. formData.value);

    
    
    this.crudSaasService.ajouterCommande(this. formData.value).subscribe({
      next: (res) => {
        this.final_commande=res
        console.log('final_commande',res)
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

  choisirRestaurant(restaurant_id:number){

    this.restaurantID = restaurant_id
    this.selectedRestaurant = this.restaurants.filter((r:any) =>
      r.id === restaurant_id
    )[0];
    let paramrestoactif=this.selectedRestaurant.parametres?.some((p:any) =>
        p.type === 'etat_paiement_acompte_click_and_collect' &&
        p.est_actif 
      )
    
    this.paymentRestoActive = (paramrestoactif )?true:false;
    console.log('this.selectedRestaurant',this.selectedRestaurant)
    console.log('this.paymentRestoActive',this.paymentRestoActive)

    if (!restaurant_id) {
      this.menus = this.allMenus;
    } else {
      this.formData.get('restaurant_id')?.setValue(restaurant_id, { emitEvent: false });
      this.menus = this.allMenus.filter(menu =>
        menu.societe_id === this.societe_id &&
        menu.restaurant_id === restaurant_id
      );

    }
    this.next()

  }


  choisirMenu(menu_id:number){

    this.menuID = menu_id
    this.selectedMenu = this.menus.filter((m:any) =>
      m.id === menu_id
    )[0];
   
    console.log('this.selectedMenu',this.selectedMenu)
    this.produits_groupes_par_cat = this.group_by_categorie(this.selectedMenu.produits)
    console.log(this.produits_groupes_par_cat)

    
    this.next()

  }


  produitActuel: any = null;
  variationActuelle: any = null;
  quantite_produit_actuel = 1;
  

  ouvrirChoixVariationsModal(variationsChoiceTemplate: TemplateRef<NgbModal>,produit:any) {
    this.quantite_produit_actuel = 1;
    this.produitActuel=produit
    this.modalService.open(variationsChoiceTemplate);
    let group = this.grouperVariations(produit.variations)
    console.log('group',group)
  }

  ouvrirAjouterProduitModal(ajouterProduitTemplate: TemplateRef<NgbModal>,produit:any,variation:any) {
    this.quantite_produit_actuel = 1;
    this.produitActuel=produit
    this.variationActuelle=variation
    this.modalService.open(ajouterProduitTemplate);
    
  }

  ajouter_produit(produit_id:number){
    this.panierService.ajouter_produit(produit_id)
  }

  ajouter_variation(produit_id:number,variation_id:number){
    this.panierService.ajouter_variation(produit_id,variation_id)
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


  load_societe_data(id:number){
    
    this.crudSaasService.getCommandeDatasBySocieteId(id).subscribe({
      next: (res) => {
        console.log('getClickAndCollectDataBySocieteId',res)
        this.societeData=res.societe//ereur La propriété 'societe' n'existe pas sur le type 'any[]'
      
        this.set_all_restaurants(res.restaurants)//ereur La propriété 'restaurants' n'existe pas sur le type 'any[]'
        this.set_all_menus(res.menus)//ereur La propriété 'services' n'existe pas sur le type 'any[]'
      
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
            p.est_actif &&
            p.valeur == 1
          )
        );
        this.restaurants = this.allRestaurants;
        console.log("getRestaurants",this.allRestaurants)
      
  }


  set_all_menus(res:any){
    
    this.menus=res.filter((menu:any) =>
      menu.societe_id === this.societe_id
    );
    this.allMenus=res.filter((menu:any) =>
      menu.societe_id === this.societe_id
    );
    console.log("getMenus",this.allMenus)
      
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
        return true

      case 3:
        return false
        break;

      case 4:
        champs = ['nom', 'prenom', 'email', 'telephone','date_retrait','heure_retrait'];
        break;

      case 5:
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
    alert('Copied');
  }


  swal_alert(texte:string){
    Swal.fire({
      title: 'Données incomplètes',
      text: texte,
      icon: 'error',
    });
  }

  group_by_categorie(produits: any[]) {

    const map = new Map();

    // 1️⃣ Grouper
    produits.forEach((p) => {
      const catId = p.categorie?.id;

      if (!catId) return;

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

    if (plainText.length <= 100) return plainText;

    return plainText.slice(0, 100) + '...';
  }

  grouperVariations(variations: any[]) {
    const map = new Map();

    variations.forEach(v => {
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


 
}