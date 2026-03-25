import { Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';

import * as chartData from '../../../../shared/data/charts/chartjs';

@Component({
  selector: 'app-radar-graph3',
  imports: [BaseChartDirective],
  templateUrl: './radar-graph3.html',
  styleUrl: './radar-graph3.scss',
})
export class RadarGraph3 {
  public radarLabels = chartData.RadarGraph3Labels;
  public radarData = chartData.RadarGraph3Data;
  public radarType = chartData.RadarGraph3Type;
  public radarOptions = chartData.RadarGraph3Options;
}
