import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { categoryChart } from '../../../../shared/data/dashboard/ecommerce/ecommerce-chart';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-category-overview',
  imports: [NgApexchartsModule, ClickOutsideDirective],
  templateUrl: './category-overview.html',
  styleUrl: './category-overview.scss',
})
export class CategoryOverview {
  public categoryChart = categoryChart;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
