import { Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

import * as chartData from '../../../../shared/data/charts/chartjs';

@Component({
  selector: 'app-radar-graph',
  imports: [BaseChartDirective],
  templateUrl: './radar-graph.html',
  styleUrl: './radar-graph.scss',
})
export class RadarGraph {
  public radarGraphOptions = chartData.radarGraphOptions;
  public radarGraphLabels = chartData.radarGraphLabels;
  public radarGraphType = chartData.radarGraphType;
  public radarGraphData = chartData.radarGraphData;
}
