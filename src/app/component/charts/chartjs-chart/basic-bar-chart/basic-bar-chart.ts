import { Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

import * as chartData from '../../../../shared/data/charts/chartjs';

@Component({
  selector: 'app-basic-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './basic-bar-chart.html',
  styleUrl: './basic-bar-chart.scss',
})
export class BasicBarChart {
  public basiclineChartLabels = chartData.basicLineLabels;
  public basiclineChartData = chartData.basicChartData;
  public basiclineChartType = chartData.basicLineChartType;
  public basiclineChartOptions = chartData.basicLineChartOptions;
}
