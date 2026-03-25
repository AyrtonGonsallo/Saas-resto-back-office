import { Component } from '@angular/core';

import { commonAbsoluteCardData } from '../../../../shared/data/bonus-ui/creative-cards';

@Component({
  selector: 'app-common-bottom-card',
  imports: [],
  templateUrl: './common-bottom-card.html',
  styleUrl: './common-bottom-card.scss',
})
export class CommonBottomCard {
  public commonData = commonAbsoluteCardData;
}
