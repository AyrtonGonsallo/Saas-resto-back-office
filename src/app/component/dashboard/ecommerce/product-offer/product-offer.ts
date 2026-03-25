import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { sildesOptions, productoffer } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-product-offer',
  imports: [RouterModule, ClickOutsideDirective, CarouselModule],
  templateUrl: './product-offer.html',
  styleUrl: './product-offer.scss',
})
export class ProductOffer {
  public SildesoptionsData = sildesOptions;
  public productoffer = productoffer;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
