import { DecimalPipe, AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, viewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-paiements',
  imports: [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,CommonModule,
    NgbModule,
    AsyncPipe,],
  templateUrl: './paiements.html',
  styleUrl: './paiements.scss',
  providers: [TableService, DecimalPipe],
})
export class Paiements {
  public service = inject(TableService);
  private router = inject(Router);
  public imagesUrl = environment.imagesUrl
  public tableData$: Observable<any[]> = this.service.supportdata$;
  public total$: Observable<number> = this.service.total$;
  public Data: any[];

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

  paiements:any

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




  get_all_datas(){

    let restaurant_id = this.restaurantService.getRestaurant()
    console.log("restaurant_id",restaurant_id)
    this.crudSaasService.getPaiements(restaurant_id).subscribe({
      next: (res) => {
        this.service.setData(res);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des paiements","Echec")
        console.log(err.error)
      }
    });
  }

  get_reservation(id:number|null){
    return (id)?`<a href="/reservations/modifier-reservation/${id}">Voir</a>`:''
  }

  get_commande(id:number|null){
    return (id)?`<a href="/commandes/modifier-commande/${id}">Voir</a>`:''
  }

}

