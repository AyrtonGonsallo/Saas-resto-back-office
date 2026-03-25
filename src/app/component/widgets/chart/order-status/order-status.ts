import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import * as Progresschart from '../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-order-status',
  imports: [NgApexchartsModule],
  templateUrl: './order-status.html',
  styleUrl: './order-status.scss',
})
export class OrderStatus {
  public orderstatus1 = Progresschart.Progress1;
  public orderstatus2 = Progresschart.Progress2;
  public orderstatus3 = Progresschart.Progress3;
  public orderstatus4 = Progresschart.Progress4;
  public orderstatus5 = Progresschart.Progress5;
}
