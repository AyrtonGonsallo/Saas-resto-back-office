import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { investing } from '../../../../shared/data/dashboard/default/default-charts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-investing',
  imports: [NgApexchartsModule, ClickOutsideDirective],
  templateUrl: './investing.html',
  styleUrl: './investing.scss',
})
export class Investing {
  public investingChart = investing;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
