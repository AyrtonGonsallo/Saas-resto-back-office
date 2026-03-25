import { Component } from '@angular/core';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import * as chartData from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-google-line-chart',
  imports: [Ng2GoogleChartsModule],
  templateUrl: './google-line-chart.html',
  styleUrl: './google-line-chart.scss',
})
export class GoogleLineChart {
  public lineChart = chartData.lineChart;
}
