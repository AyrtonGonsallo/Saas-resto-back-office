import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoursesHighlight } from '../../../../shared/data/dashboard/default/default';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { CrudSaasRestoService } from '../../../../shared/services/api/crud-saas-resto.service';
import { RestaurantService } from '../../../../shared/services/user/user.service';
import { NotificationsService } from '../../../../shared/services/notifications/notifications.service';
import { environment } from '../../../../environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-highlighted',
  imports: [ClickOutsideDirective, RouterModule, CommonModule],
  templateUrl: './courses-highlighted.html',
  styleUrl: './courses-highlighted.scss',
})
export class CoursesHighlighted {
  public coursesData = CoursesHighlight;
  public isopen: boolean = false;
  public imagesUrl = environment.imagesUrl

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }


  constructor(private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
    
  ngOnInit(): void {
    this.get_all_datas()
  }

  commandes:any

  get_all_datas(){
    let restaurant_id = this.restaurantService.getRestaurant()
    console.log("restaurant_id",restaurant_id)
    this.crudSaasService.getMaxCommandes(restaurant_id).subscribe({
      next: (res) => {
        this.commandes = (res);
        console.log("commandes",this.commandes)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
      }
    });
  }

  get_status_class(statut:string){
    let res = ''
    switch (statut) {
      case 'Nouvelle':
        res = 'primary'
        break;
      case 'En préparation':
        res = 'primary'
        break;
      case 'Prête':
        res = 'tertiary'
        break;
      case 'Retirée':
        res = 'secondary'
        break;
      case 'Annulée':
        res = 'danger'
        break;
    
      default:
        res = 'primary'
        break;
    }
    return res

  }

   getPriority(): number {
         return this.restaurantService.getUser().datas.Role?.priorite;
        }

        canViewAdminBlocks(): boolean {
          const p = this.getPriority();
         return p < 9;
        }
}
