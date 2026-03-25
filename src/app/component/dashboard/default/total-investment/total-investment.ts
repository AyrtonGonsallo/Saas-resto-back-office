import { Component, input } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { investment } from '../../../../shared/data/dashboard/default/default-charts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-total-investment',
  imports: [ClickOutsideDirective, NgApexchartsModule],
  templateUrl: './total-investment.html',
  styleUrl: './total-investment.scss',
})
export class TotalInvestment {
  public readonly investment = input<boolean>(true);

  public Investmentchart = investment;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
