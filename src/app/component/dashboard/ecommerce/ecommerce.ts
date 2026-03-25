import { Component } from '@angular/core';

import { BestSellers } from './best-sellers/best-sellers';
import { CategoryOverview } from './category-overview/category-overview';
import { ManageOrder } from './manage-order/manage-order';
import { ProductDetails } from './product-details/product-details';
import { ProductOffer } from './product-offer/product-offer';
import { ProductProgress } from './product-progress/product-progress';
import { SalesByProduct } from './sales-by-product/sales-by-product';
import { SalesSummary } from './sales-summary/sales-summary';
import { TopEcommerceChart } from './top-ecommerce-chart/top-ecommerce-chart';
import { TopSellingProducts } from './top-selling-products/top-selling-products';
import {
  TotalSale,
  Neworders,
  OrderDelivery,
} from '../../../shared/data/dashboard/ecommerce/ecommerce-chart';

@Component({
  selector: 'app-ecommerce',
  imports: [
    BestSellers,
    CategoryOverview,
    ManageOrder,
    ProductDetails,
    ProductOffer,
    ProductProgress,
    SalesByProduct,
    SalesSummary,
    TopEcommerceChart,
    TopSellingProducts,
  ],
  templateUrl: './ecommerce.html',
  styleUrl: './ecommerce.scss',
})
export class Ecommerce {
  public TotalSaleChart = TotalSale;
  public NewOrderChart = Neworders;
  public OrderDeliveryChart = OrderDelivery;
}
