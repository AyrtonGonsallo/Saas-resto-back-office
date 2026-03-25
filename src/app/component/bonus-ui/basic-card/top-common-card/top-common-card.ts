import { Component } from '@angular/core';

import { commonTopCard } from '../../../../shared/data/bonus-ui/basic-card';

@Component({
  selector: 'app-top-common-card',
  imports: [],
  templateUrl: './top-common-card.html',
  styleUrl: './top-common-card.scss',
})
export class TopCommonCard {
  public topCardData = commonTopCard;
}
