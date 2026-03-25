import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { MonthlyOverviews } from '../../../../shared/data/dashboard/default/default-charts';

@Component({
  selector: 'app-monthly-overview',
  imports: [NgApexchartsModule],
  templateUrl: './monthly-overview.html',
  styleUrl: './monthly-overview.scss',
})
export class MonthlyOverview {
  public monthlyOverviewChart = MonthlyOverviews;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
