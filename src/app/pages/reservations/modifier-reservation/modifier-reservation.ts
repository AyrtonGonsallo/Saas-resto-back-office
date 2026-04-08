import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { environment } from '../../../environment';
import { RestaurantService } from '../../../shared/services/user/user.service';


@Component({
  selector: 'app-modifier-reservation',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule,],
  templateUrl: './modifier-reservation.html',
  styleUrl: './modifier-reservation.scss',
})
export class ModifierReservation {
  private router = inject(Router);
  data_id=0
  formData!: FormGroup;
  user:any
  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService, private authSerivce:AuthSaasRestoService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
  
    this.load_data(this.data_id)
    
    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )
   
    this.formData = this.fb.group({
     
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
      creneau_du_jour_id: [null, Validators.required], //etape 3
      tags: [null, Validators.required], 
    });
  }


  onSubmit() {
    
    if (this.formData.invalid) {
      console.log("invalide",this.formData.value)
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
    
    console.log(this.formData.value);
   
    this.crudSaasService.updateReservation(this.data_id,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/reservations/liste-reservations']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error(err.error.message,"Echec")
      }
    });
    // appel API ici
  }

   statuts = [
    { key: 'En attente'},
    { key: 'Confirmée'},
    { key: 'Annulée'},
    { key: 'Terminée'},
    { key: 'No-show'},
  ];

  
  data:any
  load_data(id:number){

    this.crudSaasService.getReservationById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)

        this.get_all_restaurants(this.data.societe_id,this.data.restaurant_id)
        this.get_all_creneaux(this.data.societe_id,this.data.restaurant_id)
        this.get_all_services(this.data.societe_id,this.data.restaurant_id)
        this.get_all_tables(this.data.societe_id,this.data.restaurant_id)
        this.get_all_tags(this.data.societe_id,this.data.restaurant_id)

        const date_reservation = new Date(this.data.date_reservation);

        const localDateReservation = new Date(
          date_reservation.getUTCFullYear(),
          date_reservation.getUTCMonth(),
          date_reservation.getUTCDate(),
          date_reservation.getUTCHours(),
          date_reservation.getUTCMinutes()
        );

        console.log("localDateReservation",localDateReservation)

        this.formData = this.fb.group({
          date_reservation: [null, [Validators.required ]], //etape 3
          heure_reservation: [null, [Validators.required ]], //etape 3
          nombre_de_personnes: [this.data.nombre_de_personnes, [
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
            Validators.min(1),
            Validators.max(20)
          ]], //etape 3
          nb_couverts: [this.data.nb_couverts, [
            Validators.pattern(/^[0-9]+$/),
            Validators.min(1),
            Validators.max(50)
          ]], //etape 3
          notes: [this.data.notes, []], //etape 3
          demandes_speciales: [this.data.demandes_speciales, []], //etape 3
          statut: [this.data.statut, []], //etape 3
          service_id: [this.data.service_id, Validators.required], //etape 3
          table_id: [this.data.table_id, Validators.required], //etape 3
          creneau_id: [this.data.creneau_id, Validators.required], //etape 3
          creneau_du_jour_id: [this.data.creneau_du_jour_id, Validators.required],
          tags: [Array.isArray(this.data.tags) 
            ? this.data.tags.map((tag:any) => tag.id) 
            : [Validators.required]
          ]
        });

        this.formData.patchValue({
          date_reservation: {
            year: localDateReservation.getFullYear(),
            month: localDateReservation.getMonth() + 1,
            day: localDateReservation.getDate()
          },
          heure_reservation: {
            hour: localDateReservation.getHours(),
            minute: localDateReservation.getMinutes()
          }
        });

        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

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

  
    get_all_restaurants(societe_id:number,restaurant_id:number){
      this.crudSaasService.getRestaurants(null).subscribe({
        next: (res) => {
          this.restaurants=res.filter(cat =>
          cat.societe_id === societe_id 
          && cat.restaurant_id === restaurant_id
        );
          this.allRestaurants=res.filter(cat =>
          cat.societe_id === societe_id
          && cat.restaurant_id === restaurant_id
        );
          console.log("getRestaurants",this.allRestaurants)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
    }

    get_all_creneaux(societe_id:number,restaurant_id:number){
      this.crudSaasService.getCreneaux(null).subscribe({
        next: (res) => {
          this.crenaux=res.filter(creneau =>
            creneau.societe_id === societe_id
            && creneau.restaurant_id === restaurant_id
          ).map(creneau => ({
            ...creneau,
            fullName: creneau.heure_debut + ' - ' + creneau.heure_fin
          }));
          this.allCrenaux=res.filter(creneau =>
            creneau.societe_id === societe_id
            && creneau.restaurant_id === restaurant_id
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


    get_all_services(societe_id:number,restaurant_id:number){
      this.crudSaasService.getServices(null).subscribe({
        next: (res) => {
          this.services=res.filter(service =>
            service.societe_id === societe_id
            && service.restaurant_id === restaurant_id
          );
          this.allServices=res.filter(service =>
            service.societe_id === societe_id
            && service.restaurant_id === restaurant_id
          );

          console.log("getServices",this.allServices)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des crenaux","Echec")
        }
      });
    }

     get_all_tags(societe_id:number,restaurant_id:number){
      this.crudSaasService.getTags(null).subscribe({
        next: (res) => {
          this.tags=res.filter(tag =>
            tag.societe_id === societe_id
            && tag.restaurant_id === restaurant_id
          );
          this.allTags=res.filter(tag =>
            tag.societe_id === societe_id
            && tag.restaurant_id === restaurant_id
          );

          console.log("getTags",this.allTags)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des tags","Echec")
        }
      });
    }

    get_all_tables(societe_id:number,restaurant_id:number){
      this.crudSaasService.getTables(null).subscribe({
        next: (res) => {
          this.tables=res.filter(table =>
            table.societe_id === societe_id
            && table.restaurant_id === restaurant_id
          ).map(table => ({
            ...table,
            fullName: table.numero + ' ' + table.nb_places + ' places' 
          }));

          this.allTables=res.filter(table =>
            table.societe_id === societe_id
            && table.restaurant_id === restaurant_id
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
  
   

}