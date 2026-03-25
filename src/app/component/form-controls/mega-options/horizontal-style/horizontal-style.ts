import { Component, inject } from '@angular/core';

import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import {
  HorizontalStylelDelivery,
  Buyingoptions,
} from '../../../../shared/data/form-controls/mega-options';

@Component({
  selector: 'app-horizontal-style',
  imports: [NgbModule],
  templateUrl: './horizontal-style.html',
  styleUrl: './horizontal-style.scss',
})
export class HorizontalStyle {
  public horizontalStyleData = HorizontalStylelDelivery;
  public BuyingoptionsData = Buyingoptions;

  public config = inject(NgbRatingConfig);

  constructor() {
    this.config.max = 5;
    this.config.readonly = true;
  }
}
