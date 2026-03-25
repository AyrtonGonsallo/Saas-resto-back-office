import { Component } from '@angular/core';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';
import { Addproduct } from '../../../../shared/data/dashboard/ecommerce/ecommerce';

@Component({
  selector: 'app-product-details',
  imports: [Feathericon],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  public addProduct = Addproduct;
}
