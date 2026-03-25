import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopSellingProduct } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-top-selling-products',
  imports: [RouterModule, ClickOutsideDirective],
  templateUrl: './top-selling-products.html',
  styleUrl: './top-selling-products.scss',
})
export class TopSellingProducts {
  public TopSellingProduct = TopSellingProduct;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
