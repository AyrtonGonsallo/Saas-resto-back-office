import { Component } from '@angular/core';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import * as chartData from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-column-chart-1',
  imports: [Ng2GoogleChartsModule],
  templateUrl: './column-chart-1.html',
  styleUrl: './column-chart-1.scss',
})
export class ColumnChart1 {
  public columnChart1 = chartData.columnChart1;
}
