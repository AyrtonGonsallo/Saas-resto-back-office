import { Component } from '@angular/core';

import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-one-to-ten-ratingbar',
  imports: [BarRatingModule],
  templateUrl: './one-to-ten-ratingbar.html',
  styleUrl: './one-to-ten-ratingbar.scss',
})
export class OneToTenRatingbar {
  public faRate = 7;
}
