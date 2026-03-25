import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManageOrders } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-manage-order',
  imports: [RouterModule, ClickOutsideDirective],
  templateUrl: './manage-order.html',
  styleUrl: './manage-order.scss',
})
export class ManageOrder {
  public ManageOrder = ManageOrders;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
