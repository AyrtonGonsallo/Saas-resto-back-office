import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import * as chartData from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-column-chart',
  imports: [NgApexchartsModule],
  templateUrl: './column-chart.html',
  styleUrl: './column-chart.scss',
})
export class ColumnChart {
  public columnChart = chartData.columnChart;
}
