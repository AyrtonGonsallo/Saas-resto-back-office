import { DecimalPipe, AsyncPipe } from '@angular/common';
import { Component, inject, viewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { productListData, productListInterface } from '../../../shared/data/ecommerce/product-list';
import { ProductListDirective, SortEvent } from '../../../shared/directives/product-list.directive';
import { ProductListService } from '../../../shared/services/ecommerce/product-list.service';

@Component({
  selector: 'app-product-list',
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ProductListDirective,
    RouterModule,
    AsyncPipe,
  ],
  providers: [ProductListService, DecimalPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  public service = inject(ProductListService);
  public products$: Observable<productListInterface[]> = this.service.support$;
  public total$: Observable<number> = this.service.total$;

  public Data: productListInterface[];
  public PRODUCTLIST = productListData;
  public itemsPerPage = this.service.pageSize;
  public selectedPageSize = this.itemsPerPage;

  readonly headers = viewChildren(ProductListDirective);

  ngOnInit() {
    this.products$.subscribe(res => {
      this.Data = res;
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.headers().forEach(header => {
      if (header.sortable() !== column) {
        header.currentDirection.set('');
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
