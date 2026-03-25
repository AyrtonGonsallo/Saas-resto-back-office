import { Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

import * as chartData from '../../../../shared/data/charts/chartjs';

@Component({
  selector: 'app-radar-graph2',
  imports: [BaseChartDirective],
  templateUrl: './radar-graph2.html',
  styleUrl: './radar-graph2.scss',
})
export class RadarGraph2 {
  public radarGraph2Options = chartData.radarGraph2Options;
  public radarGraph2Labels = chartData.radarGraph2Labels;
  public radarGraph2Type = chartData.radarGraph2Type;
  public radarGraph2Data = chartData.radarGraph2Data;
}
