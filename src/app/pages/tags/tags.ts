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
import { StripHtmlPipe } from '../../shared/pipes/strip-html.pipe';
import { CleanTextPipe } from '../../shared/pipes/clean-text.pipe';

@Component({
  selector: 'app-tags',
  imports: [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,CommonModule,
    NgbModule,CleanTextPipe,
    AsyncPipe,],
  templateUrl: './tags.html',
  styleUrl: './tags.scss',
  providers: [TableService, DecimalPipe],
})
export class Tags {
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

  tags:any

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
    this.crudSaasService.getTags(restaurant_id).subscribe({
      next: (res) => {
        this.service.setData(res);
        console.log("tags",this.tags)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
      }
    });
  }

  redirect_add(){
    this.router.navigate(['/tags/creer-tag']);
  }

  modifier_data(id:number){
     if (!this.canEdit()) {
       this.notificationsService.error("Accès refusé", "Echec");
       return;
      }
    this.router.navigate(['/tags/modifier-tag', id]);
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

        this.crudSaasService.deleteTag(id).subscribe({
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

  


}
