import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { MonthlySale } from '../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-monthly-sales',
  imports: [NgApexchartsModule],
  templateUrl: './monthly-sales.html',
  styleUrl: './monthly-sales.scss',
})
export class MonthlySales {
  public MonthlySalesChart = MonthlySale;
}
