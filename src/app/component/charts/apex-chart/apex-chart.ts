import { Component } from '@angular/core';

import { BasicAreaChart } from './basic-area-chart/basic-area-chart';
import { BasicLineChart } from './basic-line-chart/basic-line-chart';
import { BubbleChart } from './bubble-chart/bubble-chart';
import { CandlestickChart } from './candlestick-chart/candlestick-chart';
import { ColumnChart } from './column-chart/column-chart';
import { DountChart } from './dount-chart/dount-chart';
import { DumbbellChart } from './dumbbell-chart/dumbbell-chart';
import { MixedChart } from './mixed-chart/mixed-chart';
import { PieChart } from './pie-chart/pie-chart';
import { PolarChart } from './polar-chart/polar-chart';
import { PyramidChart } from './pyramid-chart/pyramid-chart';
import { RadarChart } from './radar-chart/radar-chart';
import { RadialChart } from './radial-chart/radial-chart';

@Component({
  selector: 'app-apex-chart',
  imports: [
    BasicAreaChart,
    BasicLineChart,
    BubbleChart,
    CandlestickChart,
    ColumnChart,
    DountChart,
    DumbbellChart,
    PieChart,
    MixedChart,
    PolarChart,
    PyramidChart,
    RadarChart,
    RadialChart,
  ],
  templateUrl: './apex-chart.html',
  styleUrl: './apex-chart.scss',
})
export class ApexChart {}
