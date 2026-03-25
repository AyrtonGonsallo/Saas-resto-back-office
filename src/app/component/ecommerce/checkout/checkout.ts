import { Component } from '@angular/core';

import { BillingDetails } from './billing-details/billing-details';

@Component({
  selector: 'app-checkout',
  imports: [BillingDetails],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {}
