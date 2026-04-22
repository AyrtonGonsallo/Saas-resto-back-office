import { Component, input } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { DashboardWidgetOption } from '../../../../shared/interface/dashboard/chart';

@Component({
  selector: 'app-top-common-chart',
  imports: [NgApexchartsModule],
  templateUrl: './top-common-chart.html',
  styleUrl: './top-common-chart.scss',
})
export class TopCommonChart {
  readonly data = input<DashboardWidgetOption>();

   
}
