import { Component } from '@angular/core';

import { ChartistModule } from 'ng-chartist';

import * as chartData from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-lines-chart',
  imports: [ChartistModule],
  templateUrl: './lines-chart.html',
  styleUrl: './lines-chart.scss',
})
export class LinesChart {
  public LineChart = chartData.chart1;
}
