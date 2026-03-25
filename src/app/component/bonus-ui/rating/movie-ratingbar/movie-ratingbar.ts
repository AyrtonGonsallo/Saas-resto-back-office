import { Component } from '@angular/core';

import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-movie-ratingbar',
  imports: [BarRatingModule],
  templateUrl: './movie-ratingbar.html',
  styleUrl: './movie-ratingbar.scss',
})
export class MovieRatingbar {
  public movieRate = 2;
}
