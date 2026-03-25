import { Component } from '@angular/core';

import { ChartistModule } from 'ng-chartist';

import * as chartData from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-line-area-chart',
  imports: [ChartistModule],
  templateUrl: './line-area-chart.html',
  styleUrl: './line-area-chart.scss',
})
export class LineAreaChart {
  public chart5 = chartData.chart5;
}
