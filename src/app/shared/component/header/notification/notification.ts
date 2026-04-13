import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudSaasRestoService } from '../../../services/api/crud-saas-resto.service';
import { AuthSaasRestoService } from '../../../services/auth/auth-saas-resto.service';
import { NotificationsService } from '../../../services/notifications/notifications.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [RouterModule,CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
 user:any
 custom_notifications:any[]=[]

    constructor(private crudSaasService:CrudSaasRestoService,private notificationsService:NotificationsService, private authSerivce:AuthSaasRestoService, ) {
      
    }

    ngOnInit(): void {

      this.user = this.authSerivce.getUser();
      console.log('user recuperé',this.user )
      this.get_all_custom_notifications()
    }

  public notifications: boolean = false;

  notification() {
    this.notifications = !this.notifications;
  }

  clickOutside(): void {
    this.notifications = false;
  }

  get_all_custom_notifications(){

    this.crudSaasService.getAllNotificationsByUserID(this.user?.datas.id).subscribe({
      next: (res) => {
        this.custom_notifications=res;
        console.log("custom_notifications",this.custom_notifications)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des notifications","Echec")
      }
    });
  }
}
