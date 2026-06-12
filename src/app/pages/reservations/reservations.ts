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
import { environment } from '../../environment';
import { RestaurantService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-reservations',
  imports:  [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,CommonModule,
    NgbModule,
    AsyncPipe,],
  templateUrl: './reservations.html',
  styleUrl: './reservations.scss',
  providers: [TableService, DecimalPipe],
})
export class Reservations {
   public service = inject(TableService);
  private router = inject(Router);
  public imagesUrl = environment.imagesUrl
  public tableData$: Observable<any[]> = this.service.supportdata$;
  public total$: Observable<number> = this.service.total$;
  public AllData: any[];
    public Data: any[];
  public avis_url = environment.avis_url
  filtre_date="all"
  readonly headers = viewChildren(NgbdSortableHeaderDirective);

  ngOnInit() {
    this.getCurrentPriority()
    this.tableData$.subscribe(res => {
      this.Data = res;
      console.log(this.AllData)
    });
    this.service.pageSize=300
    this.get_all_datas()
  }

  changeDatas() {
    

    if (this.filtre_date === 'all') {
      this.Data = [...this.AllData];
      console.log('periode',this.filtre_date)
      this.service.setData(this.Data);
      console.log('trouvés',this.Data.length)
      console.log('total',this.AllData.length)
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.Data = this.AllData.filter(item => {

      const reservationDate = new Date(item.date_reservation);
      reservationDate.setHours(0, 0, 0, 0);

      switch (this.filtre_date) {

        case 'today':
          return reservationDate.getTime() === today.getTime();

        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);

          return reservationDate.getTime() === tomorrow.getTime();

        case 'next_week':
          const nextWeekStart = new Date(today);
          nextWeekStart.setDate(today.getDate() + 7);

          const nextWeekEnd = new Date(today);
          nextWeekEnd.setDate(today.getDate() + 14);

          return reservationDate >= nextWeekStart &&
                reservationDate < nextWeekEnd;

        default:
          return true;
      }
    });

    console.log('periode',this.filtre_date)
    this.service.setData(this.Data);
    console.log('trouvés',this.Data.length)
    console.log('total',this.AllData.length)

  } 


  constructor(private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}

  current_priority=0

  onSort({ column, direction }: SortEvent) {
    this.headers().forEach(header => {
      if (header.sortable() !== column) {
        header.currentDirection.set('');
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  reservations:any

  getCurrentPriority(): number {
    this.current_priority=this.restaurantService.getUser()?.datas?.Role?.priorite;
    return this.restaurantService.getUser()?.datas?.Role?.priorite;
      
  }

    canDelete(): boolean {
      const p = this.current_priority;
      return p <= 4;
    }

    canEdit(): boolean {
      const p = this.current_priority;
      return p <= 4;
    }



  get_all_datas(){

    let restaurant_id = this.restaurantService.getRestaurant()
    console.log("restaurant_id",restaurant_id)
    this.crudSaasService.getReservations(restaurant_id).subscribe({
      next: (res) => {

        // FILTRE par selection du restaurant
          if (restaurant_id) {
            res = res.filter(p =>
            p.restaurant_id === restaurant_id ||
            p.Restaurant?.id === restaurant_id
            );
           }
           
        this.service.setData(res);
        
      this.AllData = res;
        console.log("reservations",this.reservations)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
      }
    });
  }

  redirect_add(){
    this.router.navigate(['/reservations/creer-reservation']);
  }

  modifier_data(id:number){
     if (!this.canEdit()) {
       this.notificationsService.error("Accès refusé", "Echec");
       return;
      }
    this.router.navigate(['/reservations/modifier-reservation', id]);
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

            this.crudSaasService.deleteReservation(id).subscribe({
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


get_tables_label(tables:any){
  let res=""
  tables.forEach((table:any) => {
    res+= `${table.nb_places} personnes, ${table.ZoneTable?.titre}<br>`;
  });
  return res;
  
}
}

