import { Component } from '@angular/core';

import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-square-ratingbar',
  imports: [BarRatingModule],
  templateUrl: './square-ratingbar.html',
  styleUrl: './square-ratingbar.scss',
})
export class SquareRatingbar {
  public squareRate = 1;
}
