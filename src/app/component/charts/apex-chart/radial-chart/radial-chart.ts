import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import * as chartData from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-radial-chart',
  imports: [NgApexchartsModule],
  templateUrl: './radial-chart.html',
  styleUrl: './radial-chart.scss',
})
export class RadialChart {
  public radialBarChart = chartData.radialBarChart;
}
