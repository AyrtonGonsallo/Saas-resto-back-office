import { Component } from '@angular/core';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import * as chartData from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-bar-chart-2',
  imports: [Ng2GoogleChartsModule],
  templateUrl: './bar-chart-2.html',
  styleUrl: './bar-chart-2.scss',
})
export class BarChart2 {
  public barChart2 = chartData.barChart2;
}
