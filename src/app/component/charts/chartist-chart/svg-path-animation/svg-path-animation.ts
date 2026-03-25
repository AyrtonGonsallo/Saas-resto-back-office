import { Component } from '@angular/core';

import { ChartistModule } from 'ng-chartist';

import * as chartData from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-svg-path-animation',
  imports: [ChartistModule],
  templateUrl: './svg-path-animation.html',
  styleUrl: './svg-path-animation.scss',
})
export class SvgPathAnimation {
  public chart10 = chartData.chart10;
}
