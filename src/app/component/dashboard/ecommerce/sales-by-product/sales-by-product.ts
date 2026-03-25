import { Component } from '@angular/core';

import { SalesProduct } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-sales-by-product',
  imports: [ClickOutsideDirective],
  templateUrl: './sales-by-product.html',
  styleUrl: './sales-by-product.scss',
})
export class SalesByProduct {
  public SalesProduct = SalesProduct;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
