import { DecimalPipe, AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, viewChildren } from '@angular/core';
import {  FormsModule, ReactiveFormsModule, } from '@angular/forms';
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
import { environment } from '../../environment';
import { RestaurantService } from '../../shared/services/user/user.service';


@Component({
  selector: 'app-livraisons',
  imports:  [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,CommonModule,
    NgbModule,
    AsyncPipe,],
  templateUrl: './livraisons.html',
  styleUrl: './livraisons.scss',
  providers: [TableService, DecimalPipe],
})
export class Livraisons {
  
   public service = inject(TableService);
  private router = inject(Router);
  public imagesUrl = environment.imagesUrl
  public tableData$: Observable<any[]> = this.service.supportdata$;
  public total$: Observable<number> = this.service.total$;
  public Data: any[];
  public avis_url = environment.avis_url

  readonly headers = viewChildren(NgbdSortableHeaderDirective);

  ngOnInit() {
    this.tableData$.subscribe(res => {
      this.Data = res;
      console.log(this.Data)
    });
    this.get_all_datas()
  }
    
  constructor(private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}


  onSort({ column, direction }: SortEvent) {
    this.headers().forEach(header => {
      if (header.sortable() !== column) {
        header.currentDirection.set('');
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  livraisons:any

  getCurrentPriority(): number {
       return this.restaurantService.getUser()?.datas?.Role?.priorite;
    }

     canDelete(): boolean {
       const p = this.getCurrentPriority();
       return p <= 4;
      }

     canEdit(): boolean {
       const p = this.getCurrentPriority();
       return p <= 4;
      }



 get_all_datas() {
  const restaurant_id = this.restaurantService.getRestaurant();
  const user = this.restaurantService.getUser();


  console.log("restaurant_id", restaurant_id);
  console.log("user", user);

  this.crudSaasService.getLivraisons(restaurant_id).subscribe({
    next: (res) => {

      let filtered = res;

     

      this.livraisons = filtered;
      this.service.setData(filtered);

      console.log("livraisons affichées", filtered);
    },
    error: (err) => {
      this.notificationsService.error(
        "Erreur lors de la récupération des livraisons",
        "Echec"
      );
    }
  });
}

  redirect_add(){
    this.router.navigate(['/livraisons/creer-livraison']);
  }

  modifier_data(id:number){
     if (!this.canEdit()) {
       this.notificationsService.error("Accès refusé", "Echec");
       return;
      }
    this.router.navigate(['/livraisons/modifier-livraison', id]);
  }

  supprimer_data(id:number){
    if (!this.canDelete()) {
      this.notificationsService.error("Accès refusé", "Echec");
      return;
    }

    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet élément?',
      text: "Cette action est irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'annuler',
    }).then(result => {
      if (result.isConfirmed) {

        this.crudSaasService.deleteLivraison(id).subscribe({
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
          text: 'L\'élément à bien été supprimé.',
          icon: 'success',
        });
      }
    });
  }

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    alert('Copied');
  }

  canSeeAvis(): boolean {
  const p = this.getCurrentPriority();
  return p <= 4; 
}
  
}
