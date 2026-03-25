import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import * as chartData from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-basic-area-chart',
  imports: [NgApexchartsModule],
  templateUrl: './basic-area-chart.html',
  styleUrl: './basic-area-chart.scss',
})
export class BasicAreaChart {
  public areaChart = chartData.basicAreachart;
}
