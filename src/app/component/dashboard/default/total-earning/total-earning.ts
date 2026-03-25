import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { TotalEarnings } from '../../../../shared/data/dashboard/default/default-charts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-total-earning',
  imports: [NgApexchartsModule, ClickOutsideDirective],
  templateUrl: './total-earning.html',
  styleUrl: './total-earning.scss',
})
export class TotalEarning {
  public Totalearningchart = TotalEarnings;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
