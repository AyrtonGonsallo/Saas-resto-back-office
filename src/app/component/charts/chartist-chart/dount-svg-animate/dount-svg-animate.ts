import { Component } from '@angular/core';

import { ChartistModule } from 'ng-chartist';

import * as chartData from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-dount-svg-animate',
  imports: [ChartistModule],
  templateUrl: './dount-svg-animate.html',
  styleUrl: './dount-svg-animate.scss',
})
export class DountSvgAnimate {
  public chart3 = chartData.chart3;
}
