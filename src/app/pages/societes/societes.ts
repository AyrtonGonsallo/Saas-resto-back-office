import { DecimalPipe, AsyncPipe } from '@angular/common';
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

@Component({
  selector: 'app-societes',
   imports: [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,
    NgbModule,
    AsyncPipe,],
  templateUrl: './societes.html',
  styleUrl: './societes.scss',
  providers: [TableService, DecimalPipe],
})
export class Societes {
   public service = inject(TableService);
     private router = inject(Router);
   
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
       
     constructor(private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}
   
   
     onSort({ column, direction }: SortEvent) {
       this.headers().forEach(header => {
         if (header.sortable() !== column) {
           header.currentDirection.set('');
         }
       });
   
       this.service.sortColumn = column;
       this.service.sortDirection = direction;
     }

     
   
     societes:any
   
   
     get_all_datas(){
   
       this.crudSaasService.getSocietes().subscribe({
         next: (res) => {
           this.service.setData(res);
           console.log("societes",this.societes)
         },
         error: (err) => {
           this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
         }
       });
     }
   
     redirect_add(){
       this.router.navigate(['/societes/creer-societe']);
     }
   
     modifier_data(id:number){
       this.router.navigate(['/societes/modifier-societe', id]);
     }
   
     supprimer_data(id:number){
   
       
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
   
               this.crudSaasService.deleteSociete(id).subscribe({
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
   
   