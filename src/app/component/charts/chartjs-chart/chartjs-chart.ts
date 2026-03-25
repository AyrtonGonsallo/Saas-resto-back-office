import { Component } from '@angular/core';

import { BasicBarChart } from './basic-bar-chart/basic-bar-chart';
import { BasicLinesChart } from './basic-lines-chart/basic-lines-chart';
import { DonutGraph } from './donut-graph/donut-graph';
import { RadarGraph } from './radar-graph/radar-graph';
import { RadarGraph2 } from './radar-graph2/radar-graph2';
import { RadarGraph3 } from './radar-graph3/radar-graph3';

@Component({
  selector: 'app-chartjs-chart',
  imports: [BasicBarChart, BasicLinesChart, DonutGraph, RadarGraph2, RadarGraph, RadarGraph3],
  templateUrl: './chartjs-chart.html',
  styleUrl: './chartjs-chart.scss',
})
export class ChartjsChart {}
