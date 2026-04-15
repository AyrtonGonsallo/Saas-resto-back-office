import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { Feathericon } from '../../shared/component/feathericon/feathericon';
import { Chats, Contacts } from '../../shared/data/chat/chat';
import { ClickOutsideDirective } from '../../shared/directives/outside.directive';
import { CrudSaasRestoService } from '../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import { AuthSaasRestoService } from '../../shared/services/auth/auth-saas-resto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [ NgbModule, Feathericon,RouterModule, ClickOutsideDirective,CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications {
   public active = 1;
    public privateData = Chats;
    public contactsData = Contacts;

     user:any
 custom_notifications:any[]=[]

    constructor(private crudSaasService:CrudSaasRestoService,private notificationsService:NotificationsService, private authSerivce:AuthSaasRestoService, ) {}
    
  
    openMenu(id: number) {
      this.contactsData.filter(da => {
        da.item.forEach(data => {
          if (data.id == id) {
            data.isActive = !data.isActive;
          }
        });
      });
    }

    ngOnInit(): void {

      this.user = this.authSerivce.getUser();
      console.log('user recuperé',this.user )
      this.get_all_custom_notifications()
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

  get_class(statut:string){
    let res = ''
    switch (statut) {
      case 'non lue':
        res = 'bg-success'
        break;
      case 'lue':
        res = 'bg-warning'
        break;
    
      default:
        break;
    }
    return res
  }
}
