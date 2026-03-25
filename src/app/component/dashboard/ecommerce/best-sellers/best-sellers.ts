import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BestSeller } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-best-sellers',
  imports: [ClickOutsideDirective, RouterModule],
  templateUrl: './best-sellers.html',
  styleUrl: './best-sellers.scss',
})
export class BestSellers {
  public BestSellerData = BestSeller;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
