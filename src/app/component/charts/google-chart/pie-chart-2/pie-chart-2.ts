import { Component } from '@angular/core';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import * as chartData from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-pie-chart-2',
  imports: [Ng2GoogleChartsModule],
  templateUrl: './pie-chart-2.html',
  styleUrl: './pie-chart-2.scss',
})
export class PieChart2 {
  public pieChart2 = chartData.pieChart2;
}
