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
import { types,getTypeName, getNotAdminOnly } from '../../shared/constants/types-parametres';
import { SearchService } from '../../shared/services/search/search.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-parametres',
  imports: [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,CommonModule,
    NgbModule,NgSelectModule,
    AsyncPipe,],
  templateUrl: './parametres.html',
  styleUrl: './parametres.scss',
  providers: [TableService, DecimalPipe],
})
export class Parametres {
  public service = inject(TableService);
  private router = inject(Router);
  public imagesUrl = environment.imagesUrl
  public tableData$: Observable<any[]> = this.service.supportdata$;
  public total$: Observable<number> = this.service.total$;
  public Data: any[];
types: any[] = types;
current_params: any[] = [];
filter_params: string[] = [];

  readonly headers = viewChildren(NgbdSortableHeaderDirective);

  ngOnInit() {
    this.tableData$.subscribe(res => {
      this.Data = res;
      console.log(this.Data)
    });
    this.get_all_datas()
    this.service.pageSize=300
    this.getSearchTerm()
   // this.getParamsFilter()

    this.service.sortColumn = 'getTypeNameFromkey';
    this.service.sortDirection = 'asc';
  }
    
  current_priority=0
   getCurrentPriority(): number {
    this.current_priority=this.restaurantService.getUser()?.datas?.Role?.priorite;
    return this.restaurantService.getUser()?.datas?.Role?.priorite;
      
  }

  constructor(private searchService:SearchService,private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}


  onSort({ column, direction }: SortEvent) {
    this.headers().forEach(header => {
      if (header.sortable() !== column) {
        header.currentDirection.set('');
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  parametres:any
  getTypeNameFromkey(key:string){
    return getTypeName(key)
  }

  getStatus(status:boolean){
    if(status){
      return '<i class="fa-solid fa-check font-primary"></i>';
    }else{
      return '<i class="fa-solid fa-x font-danger"></i>';
    }
  }

  onSearchTermChange(value: string) {
      this.searchService.setSearchTerm(value);
  }

  

  getSearchTerm() {
    this.service.searchTerm = this.searchService.getSearchTerm();
  }




  all_params:any
  get_all_datas(){

    this.getCurrentPriority()
    let restaurant_id = this.restaurantService.getRestaurant()
    console.log("restaurant_id",restaurant_id)
    this.crudSaasService.getParametres(restaurant_id).subscribe({
      next: (res) => {
        if(this.current_priority>3){
          res=getNotAdminOnly(res);
          console.log('prio >3',this.current_priority)
        }

        // FILTRE par selection du restaurant
        if (restaurant_id) {
          res = res.filter(p =>
          p.restaurant_id === restaurant_id ||
          p.Restaurant?.id === restaurant_id
          );
          }
        this.all_params = res
        this.current_params = this.all_params
        this.service.setData(this.current_params);
        console.log("all_params",this.all_params)

      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
      }
    });
  }

  redirect_add(){
    this.router.navigate(['/parametres/creer-parametre']);
  }

  modifier_data(id:number){
    this.router.navigate(['/parametres/modifier-parametre', id]);
  }

  supprimer_data(id:number){

    
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

            this.crudSaasService.deleteParametre(id).subscribe({
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



  get_valeur(data:any){
    return (data.type_de_valeur=='unite_temporelle')?`${data.valeur} ${data.unite_de_temps}`:data.valeur;
  }






}
