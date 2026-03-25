import { Component } from '@angular/core';

import { ChartistModule } from 'ng-chartist';

import * as chartData from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-bi-polar-line',
  imports: [ChartistModule],
  templateUrl: './bi-polar-line.html',
  styleUrl: './bi-polar-line.scss',
})
export class BiPolarLine {
  public chart4 = chartData.chart4;
}
