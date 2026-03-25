import { Component } from '@angular/core';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import * as chartData from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-pie-chart-1',
  imports: [Ng2GoogleChartsModule],
  templateUrl: './pie-chart-1.html',
  styleUrl: './pie-chart-1.scss',
})
export class PieChart1 {
  public pieChart1 = chartData.pieChart1;
}
