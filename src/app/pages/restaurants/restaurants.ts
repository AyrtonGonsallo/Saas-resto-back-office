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
import { environment } from '../../environment';

@Component({
  selector: 'app-restaurants',
  imports: [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    AsyncPipe,],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.scss',
  providers: [TableService, DecimalPipe],
})
export class Restaurants {
  public service = inject(TableService);
     private router = inject(Router);
    public imagesUrl = environment.imagesUrl
    public reservation_url = environment.reservation_url
    public click_and_collect_url = environment.click_and_collect_url
   
     public tableData$: Observable<any[]> = this.service.supportdata$;
     public total$: Observable<number> = this.service.total$;
     public Data: any[];
   
     readonly headers = viewChildren(NgbdSortableHeaderDirective);
   
     ngOnInit() {
       
       this.get_all_datas()
     }
       
     constructor(private crudSaasService:CrudSaasRestoService,private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
   
   
     onSort({ column, direction }: SortEvent) {
       this.headers().forEach(header => {
         if (header.sortable() !== column) {
           header.currentDirection.set('');
         }
       });
   
       this.service.sortColumn = column;
       this.service.sortDirection = direction;
     }

     
   
     restaurants:any


     getCurrentPriority(): number {
       return this.restaurantService.getUser()?.datas?.Role?.priorite;
    }

     canDelete(): boolean {
       const p = this.getCurrentPriority();
       return p < 3;
      }

     canEdit(): boolean {
       const p = this.getCurrentPriority();
       return p <= 4;
      }

      canRecreate(): boolean {
        const p = this.getCurrentPriority();
        return p <= 4;
      }
   
   
     get_all_datas(){
   
      let restaurant_id = this.restaurantService.getRestaurant()
       this.crudSaasService.getRestaurants(restaurant_id).subscribe({
         next: (res) => {
          this.restaurants = res
           this.service.setData(res);
         },
         error: (err) => {
           this.notificationsService.error("Erreur lors de la récupération des données","Echec")
         }
       });
     }
   
     redirect_add(){
       this.router.navigate(['/restaurants/creer-restaurant']);
     }
   
     modifier_data(id:number){
      if (!this.canEdit()) {
       this.notificationsService.error("Accès refusé", "Echec");
       return;
      }
       this.router.navigate(['/restaurants/modifier-restaurant', id]);
     }

     recreer_parametres_restaurant(restoid:number){
      if (!this.canRecreate()) {
       this.notificationsService.error("Accès refusé", "Echec");
      return;
      }
        this.crudSaasService.recreateParametresRestaurant(restoid).subscribe({
          next: (res) => {
            console.log(res)
            Swal.fire({
                 title: `Parametres recrées !`,
                 text: `${res.total} Parametres recrées pour le restaurant #${restoid}`,
                 icon: 'success',
               });
          },
          error: (err) => {
            this.notificationsService.error(err.error.message,"Echec")
          }
        });
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
   
               this.crudSaasService.deleteRestaurant(id).subscribe({
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

     copyFunction(txt: string) {
        navigator.clipboard.writeText(txt);
        alert('Copied');
      }

    
   }
   