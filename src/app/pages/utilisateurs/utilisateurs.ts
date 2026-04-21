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
import { RestaurantService } from '../../shared/services/user/user.service';


@Component({
  selector: 'app-utilisateurs',
  imports: [FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,
    NgbModule,
    AsyncPipe,],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.scss',
  providers: [TableService, DecimalPipe],
})
export class Utilisateurs {
  public service = inject(TableService);
     private router = inject(Router);
   
     public tableData$: Observable<any[]> = this.service.supportdata$;
     public total$: Observable<number> = this.service.total$;
     public Data: any[];
   
     readonly headers = viewChildren(NgbdSortableHeaderDirective);
   
     ngOnInit() {
       
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

     
   
     utilisateurs:any
   
   
     get_all_datas(){
      let restaurant_id = this.restaurantService.getRestaurant()
   
       this.crudSaasService.getUtilisateurs(restaurant_id).subscribe({
         next: (res) => {
          this.utilisateurs = res
           this.service.setData(res);
         },
         error: (err) => {
           this.notificationsService.error("Erreur lors de la récupération des données","Echec")
         }
       });
     }
   
     redirect_add(){
       this.router.navigate(['/utilisateurs/creer-utilisateur']);
     }
   
     modifier_data(id:number){
       this.router.navigate(['/utilisateurs/modifier-utilisateur', id]);
     }

     get_restos_liste(liste: any[]): string {
        if (!liste || liste.length === 0) return ''; // pas de restaurants
        // on récupère juste le nom et on join avec une virgule
        return liste.map(r => r.nom).join(', ');
      }
   
     supprimer_data(id:number,priorite:number){

      let user = this.restaurantService.getUser()
      let priorite_connected_user = user?.datas?.Role?.priorite
      console.log(priorite_connected_user,priorite,priorite_connected_user<=priorite)
      if(priorite_connected_user>=priorite){
        Swal.fire({
          title: 'Pas assez de privilèges',
          text: `Cet utilisateur à la priorité ${priorite} et vous avez la priorité ${priorite_connected_user}`,
          icon: 'error',
        });
      }else{
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

            this.crudSaasService.deleteUtilisateur(id).subscribe({
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

canEdit(user: any): boolean {
  let currentUser = this.restaurantService.getUser();

  let priorite_connected_user = currentUser?.datas?.Role?.priorite;
  let societe_connected_user = currentUser?.datas?.societe_id;

  let priorite_target_user = user?.Role?.priorite;
  let societe_target_user = user?.societe_id;

  // super admin peut tout modifier
  if (priorite_connected_user === 1) {
    return true;
  }

  // société différente = interdit
  if (societe_connected_user != societe_target_user) {
    return false;
  }

  // peut modifier seulement les rôles inférieurs
  if (priorite_connected_user >= priorite_target_user) {
    return false;
  }

  return true;
}

canDelete(user: any): boolean {
  const currentUser = this.restaurantService.getUser();
  const currentPriority = currentUser?.datas?.Role?.priorite;
  const currentSociete = currentUser?.datas?.societe_id;
  const targetPriority = user?.Role?.priorite;
  const targetSociete = user?.societe_id;

  // Super admin peut tout supprimer
  if (currentPriority === 1) return true;

  // société différente → interdit
  if (currentSociete !== targetSociete) return false;

  // ne peut supprimer que les rôles STRICTEMENT inférieurs
  return targetPriority > currentPriority;
}
   }
   