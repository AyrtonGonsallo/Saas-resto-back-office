import { Component } from '@angular/core';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';
import { ordersHistory } from '../../../../shared/data/ecommerce/orderhistory';

@Component({
  selector: 'app-orders-data',
  imports: [Feathericon],
  templateUrl: './orders-data.html',
  styleUrl: './orders-data.scss',
})
export class OrdersData {
  public orderHistory = ordersHistory;

  cancelOrder(index: number, id: number) {
    this.orderHistory.forEach(data => {
      data.data.forEach(element => {
        if (element.id == id) {
          data.data.splice(index, 1);
        }
      });
    });
  }
}
