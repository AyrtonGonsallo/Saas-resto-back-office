import { Component } from '@angular/core';

import { ChartistModule } from 'ng-chartist';

import * as chartData from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-advanced-smil-animations',
  imports: [ChartistModule],
  templateUrl: './advanced-smil-animations.html',
  styleUrl: './advanced-smil-animations.scss',
})
export class AdvancedSmilAnimations {
  public chart2 = chartData.chart2;
}
