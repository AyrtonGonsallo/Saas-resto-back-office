import { Component } from '@angular/core';

import { AdvancedSmilAnimations } from './advanced-smil-animations/advanced-smil-animations';
import { BiPolarBarChart } from './bi-polar-bar-chart/bi-polar-bar-chart';
import { BiPolarLine } from './bi-polar-line/bi-polar-line';
import { DountSvgAnimate } from './dount-svg-animate/dount-svg-animate';
import { ExtremeResponsiveConfiguration } from './extreme-responsive-configuration/extreme-responsive-configuration';
import { FilledHolesInData } from './filled-holes-in-data/filled-holes-in-data';
import { HolesInData } from './holes-in-data/holes-in-data';
import { HorizontalBarChart } from './horizontal-bar-chart/horizontal-bar-chart';
import { LineAreaChart } from './line-area-chart/line-area-chart';
import { LinesChart } from './lines-chart/lines-chart';
import { StackedBarChart } from './stacked-bar-chart/stacked-bar-chart';
import { SvgPathAnimation } from './svg-path-animation/svg-path-animation';

@Component({
  selector: 'app-chartist-chart',
  imports: [
    AdvancedSmilAnimations,
    BiPolarBarChart,
    BiPolarLine,
    DountSvgAnimate,
    ExtremeResponsiveConfiguration,
    FilledHolesInData,
    HolesInData,
    HorizontalBarChart,
    LineAreaChart,
    LinesChart,
    StackedBarChart,
    SvgPathAnimation,
  ],
  templateUrl: './chartist-chart.html',
  styleUrl: './chartist-chart.scss',
})
export class ChartistChart {}
