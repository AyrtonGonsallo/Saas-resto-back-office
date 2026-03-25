import { Component } from '@angular/core';

import { CommonWidgetsChart } from './common-widgets-chart/common-widgets-chart';
import { CryptAnnotations } from './crypt-annotations/crypt-annotations';
import { CryptocurrencyPrices } from './cryptocurrency-prices/cryptocurrency-prices';
import { Finance } from './finance/finance';
import { LiveProducts } from './live-products/live-products';
import { MonthlyHistory } from './monthly-history/monthly-history';
import { MonthlySales } from './monthly-sales/monthly-sales';
import { OrderStatus } from './order-status/order-status';
import { OrderStatus2 } from './order-status2/order-status2';
import { SkillStatus } from './skill-status/skill-status';
import { StockMarket } from './stock-market/stock-market';
import { TrunOver } from './trun-over/trun-over';
import { Uses } from './uses/uses';
import * as chartData from '../../../shared/data/widgets/chart';

@Component({
  selector: 'app-chart',
  imports: [
    CommonWidgetsChart,
    CryptocurrencyPrices,
    Finance,
    LiveProducts,
    MonthlyHistory,
    MonthlySales,
    OrderStatus,
    OrderStatus2,
    SkillStatus,
    StockMarket,
    Uses,
    CryptAnnotations,
    TrunOver,
  ],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class Chart {
  public chart1 = chartData.widgetChart;
  public chart2 = chartData.widgetChart2;
  public chart3 = chartData.widgetChart3;
}
