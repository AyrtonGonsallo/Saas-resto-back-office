import { Component } from '@angular/core';

import {
  TotalSale,
  Neworders,
  OrderDelivery,
} from '../../../shared/data/dashboard/ecommerce/ecommerce-chart';
import { ScheduleTime } from '../../dashboard/default/schedule-time/schedule-time';
import { TaskSummary } from '../../dashboard/default/task-summary/task-summary';
import { TotalInvestment } from '../../dashboard/default/total-investment/total-investment';
import { ProductOffer } from '../../dashboard/ecommerce/product-offer/product-offer';
import { SalesSummary } from '../../dashboard/ecommerce/sales-summary/sales-summary';
import { TopEcommerceChart } from '../../dashboard/ecommerce/top-ecommerce-chart/top-ecommerce-chart';
import { ProjectProgress } from '../../dashboard/project/project-progress/project-progress';

@Component({
  selector: 'app-general',
  imports: [
    TopEcommerceChart,
    ScheduleTime,
    ProductOffer,
    SalesSummary,
    TotalInvestment,
    TaskSummary,
    ProjectProgress,
  ],
  templateUrl: './general.html',
  styleUrl: './general.scss',
})
export class General {
  public TotalSaleChart = TotalSale;
  public NewOrderChart = Neworders;
  public OrderDeliveryChart = OrderDelivery;
}
