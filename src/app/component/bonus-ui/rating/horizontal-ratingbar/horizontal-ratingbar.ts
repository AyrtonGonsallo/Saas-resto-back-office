import { Component } from '@angular/core';

import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-horizontal-ratingbar',
  imports: [BarRatingModule],
  templateUrl: './horizontal-ratingbar.html',
  styleUrl: './horizontal-ratingbar.scss',
})
export class HorizontalRatingbar {
  public verticalRate = 1;
}
