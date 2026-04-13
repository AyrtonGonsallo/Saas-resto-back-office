import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AllInvoice } from '../../../../shared/data/dashboard/default/default';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { CrudSaasRestoService } from '../../../../shared/services/api/crud-saas-resto.service';
import { RestaurantService } from '../../../../shared/services/user/user.service';
import { NotificationsService } from '../../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-invoices',
  imports: [ClickOutsideDirective, RouterModule,CommonModule],
  templateUrl: './all-invoices.html',
  styleUrl: './all-invoices.scss',
})
export class AllInvoices {
  public InvoiceData = AllInvoice;
  public isopen: boolean = false;

    constructor(private crudSaasService:CrudSaasRestoService, private restaurantService: RestaurantService, private notificationsService:NotificationsService,) {}
  
    ngOnInit(): void {
      this.get_all_datas()
    }

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }

   reservations:any


  get_all_datas(){

    let restaurant_id = this.restaurantService.getRestaurant()
    console.log("restaurant_id",restaurant_id)
    this.crudSaasService.getReservations(restaurant_id).subscribe({
      next: (res) => {
        this.reservations = (res);
        console.log("reservations",this.reservations)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des rôles","Echec")
      }
    });
  }
}
