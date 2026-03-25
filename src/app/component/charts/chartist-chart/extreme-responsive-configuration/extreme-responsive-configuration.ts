import { Component } from '@angular/core';

import { ChartistModule } from 'ng-chartist';

import * as chartData from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-extreme-responsive-configuration',
  imports: [ChartistModule],
  templateUrl: './extreme-responsive-configuration.html',
  styleUrl: './extreme-responsive-configuration.scss',
})
export class ExtremeResponsiveConfiguration {
  public chart9 = chartData.chart9;
}
