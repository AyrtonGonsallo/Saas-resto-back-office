import { DecimalPipe, AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, viewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Router,  } from '@angular/router';
import {
  NgbdSortableHeaderDirective,
  SortEvent,
} from '../../shared/directives/sortable.directive';
import { TableService } from '../../shared/services/table.service';
import { CrudSaasRestoService } from '../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import { RestaurantService } from '../../shared/services/user/user.service';
import { SearchService } from '../../shared/services/search/search.service';



@Component({
  selector: 'app-restaurant-horaires-click-and-collect',
  imports: [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    AsyncPipe,],
  templateUrl: './restaurant-horaires-click-and-collect.html',
  styleUrl: './restaurant-horaires-click-and-collect.scss',
  providers: [TableService, DecimalPipe],
})
export class RestaurantHorairesClickAndCollect {
   public service = inject(TableService);
     private router = inject(Router);
   
     public tableData$: Observable<any[]> = this.service.supportdata$;
     public total$: Observable<number> = this.service.total$;
     public Data: any[];
   
     readonly headers = viewChildren(NgbdSortableHeaderDirective);
   
     current_priority=0

     ngOnInit() {
      this.current_priority = this.restaurantService.getUser()?.datas?.Role?.priorite;
      this.service.pageSize=500
      this.get_all_datas()
      this.getSearchTerm()
     }
       
    constructor(private searchService:SearchService, private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
  
    onSort({ column, direction }: SortEvent) {
      this.headers().forEach(header => {
        if (header.sortable() !== column) {
          header.currentDirection.set('');
        }
      });
  
      this.service.sortColumn = column;
      this.service.sortDirection = direction;
    }

    onSearchTermChange(value: string) {
      this.searchService.setSearchTerm(value);
    }



    getSearchTerm() {
      this.service.searchTerm = this.searchService.getSearchTerm();
    }

     
   
     horaires:any


     getCurrentPriority(): number {
       this.current_priority=this.restaurantService.getUser()?.datas?.Role?.priorite;
       return this.restaurantService.getUser()?.datas?.Role?.priorite;
    }
    
    
     canDelete(): boolean {
       const p = this.getCurrentPriority();
       return p < 5;
      }

     canEdit(): boolean {
       const p = this.getCurrentPriority();
       return p <= 4;
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
   
     get_all_datas(){
   
      let restaurant_id = this.restaurantService.getRestaurant()
       this.crudSaasService.get_all_horaires_click_and_collect(restaurant_id).subscribe({
         next: (res) => {
          console.log('this.horaires',res)
          this.horaires = res

          // FILTRE par selection du restaurant
          if (restaurant_id) {
            res = res.filter(p =>
            p.restaurant_id === restaurant_id ||
            p.Restaurant?.id === restaurant_id
            );
           }

            

            res.sort((a: any, b: any) =>
              this.ordreJours.indexOf(a.jour) - this.ordreJours.indexOf(b.jour)
            );

           this.service.setData(res);
         },
         error: (err) => {
           this.notificationsService.error("Erreur lors de la récupération des données","Echec")
         }
       });
     }
   
     redirect_add(){
       this.router.navigate(['/horaires-click-and-collect/creer-horaire-click-and-collect']);
     }
   
     modifier_data(id:number){
      if (!this.canEdit()) {
       this.notificationsService.error("Accès refusé", "Echec");
       return;
      }
       this.router.navigate(['/horaires-click-and-collect/modifier-horaire-click-and-collect', id]);
     }

    

   
   
    supprimer_data(id:number){
   
      if (!this.canDelete()) {
        this.notificationsService.error("Accès refusé", "Echec");
        return;
      }
  
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer cet élément ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'annuler',
      }).then(result => {
        if (result.isConfirmed) {

          this.crudSaasService.delete_horaire(id).subscribe({
            next: (res) => {
              console.log("res supp",res)
              //this.notificationsService.success("Rôle supprimé !","Succès")
              this.get_all_datas()
            },
            error: (err) => {
              this.notificationsService.error("Erreur lors de la suppression de l'élément","Echec")
            }
          });

          Swal.fire({
            title: 'Suppression faite!',
            text: 'L\'élement à bien été supprimé.',
            icon: 'success',
          });
        }
      });
         
    }

 

    
   }