import { Component } from '@angular/core';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import * as chartData from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-pie-chart-4',
  imports: [Ng2GoogleChartsModule],
  templateUrl: './pie-chart-4.html',
  styleUrl: './pie-chart-4.scss',
})
export class PieChart4 {
  public pieChart4 = chartData.pieChart4;
}
