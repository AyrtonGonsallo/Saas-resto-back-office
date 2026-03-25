import { DecimalPipe, AsyncPipe } from '@angular/common';
import { Component, inject, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';
import { orderHistoryTable } from '../../../../shared/data/ecommerce/orderhistory';
import {
  OrderdataTableDirective,
  SortEvent,
} from '../../../../shared/directives/orderdata.directive';
import { ORDERS } from '../../../../shared/interface/odershistory';
import { OrderService } from '../../../../shared/services/ecommerce/order.service';

@Component({
  selector: 'app-datatable-order-history',
  imports: [NgbModule, OrderdataTableDirective, Feathericon, FormsModule, RouterModule, AsyncPipe],
  providers: [OrderService, DecimalPipe],
  templateUrl: './datatable-order-history.html',
  styleUrl: './datatable-order-history.scss',
})
export class DatatableOrderHistory {
  public service = inject(OrderService);

  public products$: Observable<ORDERS[]> = this.service.support$;
  public total$: Observable<number> = this.service.total$;
  public Data: ORDERS[];
  public orderHistoryData = orderHistoryTable;

  readonly headers = viewChildren(OrderdataTableDirective);

  ngOnInit() {
    this.products$.subscribe(res => {
      this.Data = res;
    });
  }

  get filteredData(): ORDERS[] {
    return this.orderHistoryData.filter(
      (person: {
        productimg: string;
        product: string;
        size: string;
        status: string;
        color: string;
      }) => {
        return (
          person.productimg.toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          person.product.toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          person.status.toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          person.size.toLowerCase().includes(this.service.searchTerm.toLowerCase()) ||
          person.color.toLowerCase().includes(this.service.searchTerm.toLowerCase())
        );
      },
    );
  }

  getStartingIndex(): number {
    if (this.filteredData.length === 0) {
      return 0;
    }
    return (this.service.page - 1) * this.service.pageSize + 1;
  }

  getEndingIndex(): number {
    const endIndex = this.service.page * this.service.pageSize;
    return endIndex > this.filteredData.length ? this.filteredData.length : endIndex;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers().forEach(header => {
      if (header.sortableOrder() !== column) {
        header.currentDirection.set('');
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
