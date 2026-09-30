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
  selector: 'app-portefeuilles',
    imports: [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,CommonModule,
    NgbModule,
    AsyncPipe,],
  templateUrl: './portefeuilles.html',
  styleUrl: './portefeuilles.scss',
  providers: [TableService, DecimalPipe],
})
export class Portefeuilles {
   public service = inject(TableService);
  private router = inject(Router);
  public imagesUrl = environment.imagesUrl
  public tableData$: Observable<any[]> = this.service.supportdata$;
  public total$: Observable<number> = this.service.total$;
  public Data: any[];

  readonly headers = viewChildren(NgbdSortableHeaderDirective);
   current_priority=0;
  ngOnInit() {
    this.current_priority = this.restaurantService.getUser()?.datas?.Role?.priorite;
    this.tableData$.subscribe(res => {
      this.Data = res;
      console.log(this.Data)
    });
    this.service.pageSize=300
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

  paniers:any

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

   
    this.crudSaasService.getPortefeuille().subscribe({
      next: (res) => {
        console.log('portefeuilles',res)
        this.service.setData(res);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des paniers","Echec")
        console.log(err.error)
      }
    });
  }

 

 

}


