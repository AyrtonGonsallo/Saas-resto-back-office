import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import {
  SalesSummary1,
  SalesSummary2,
} from '../../../../shared/data/dashboard/ecommerce/ecommerce-chart';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-sales-summary',
  imports: [NgApexchartsModule, ClickOutsideDirective],
  templateUrl: './sales-summary.html',
  styleUrl: './sales-summary.scss',
})
export class SalesSummary {
  public SalesSummary1 = SalesSummary1;
  public SalesSummary2 = SalesSummary2;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
