import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Notification } from '../../../../shared/data/dashboard/default/default';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { CrudSaasRestoService } from '../../../../shared/services/api/crud-saas-resto.service';
import { RestaurantService } from '../../../../shared/services/user/user.service';
import { NotificationsService } from '../../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [RouterModule, ClickOutsideDirective, CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications {
  public notificationData = Notification;
  public isopen: boolean = false;

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
  


  notifications:any
  low_produits:any
  low_variations:any


  get_all_datas(){

    let restaurant_id = this.restaurantService.getRestaurant()
    let user_id = this.restaurantService.getUser().datas.id
    console.log("restaurant_id",restaurant_id)
    this.crudSaasService.getAllUnreadNotificationsByUserID(user_id,3).subscribe({
      next: (res) => {
        this.notifications = (res.slice(0,4));
        console.log("notifications",this.notifications)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des notifications","Echec")
      }
    });

    this.crudSaasService.getLowsProduits(restaurant_id).subscribe({
      next: (res) => {
        this.low_produits = (res.slice(0,9));
        console.log("produits bas",this.low_produits)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des produits","Echec")
      }
    });

    this.crudSaasService.getLowsVariationsProduits(restaurant_id).subscribe({
      next: (res) => {
        this.low_variations = (res.slice(0,9));
        console.log("variations basses",this.low_variations)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des produits","Echec")
      }
    });
  }

//'non lue', 'lue'
  get_status_class(statut:string){
    let res = ''
    switch (statut) {
      case 'non lue':
        res = 'primary'
        break;
      case 'lue':
        res = 'tertiary'
        break;
      
    
      default:
        res = 'tertiary'
        break;
    }
    return res

  }

  
//'non lue', 'lue'
  get_status_class2(stock:number){
    let res = ''
    switch (stock) {
      case 4:
        res = 'primary'
        break;
      case 3:
        res = 'secondary'
        break;
      case 2:
        res = 'info'
        break;
      case 1:
        res = 'tertiary'
        break;
      case 0:
        res = 'danger'
        break;
      
    
      default:
        res = 'info'
        break;
    }
    return res

  }

  getPriority(): number {
  return this.restaurantService.getUser().datas.Role?.priorite;
}

canViewAdminBlocks(): boolean {
  const p = this.getPriority();
  return p < 8;
}
}
