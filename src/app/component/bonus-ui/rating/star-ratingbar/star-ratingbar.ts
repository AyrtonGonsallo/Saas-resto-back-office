import { Component } from '@angular/core';

import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-star-ratingbar',
  imports: [BarRatingModule],
  templateUrl: './star-ratingbar.html',
  styleUrl: './star-ratingbar.scss',
})
export class StarRatingbar {
  public cssRate = 1;
}
