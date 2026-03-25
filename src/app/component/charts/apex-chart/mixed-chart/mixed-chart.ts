import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import * as chartData from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-mixed-chart',
  imports: [NgApexchartsModule],
  templateUrl: './mixed-chart.html',
  styleUrl: './mixed-chart.scss',
})
export class MixedChart {
  public MixedChart = chartData.MixedChart;
}
