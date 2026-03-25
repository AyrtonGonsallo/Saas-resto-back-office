import { Component } from '@angular/core';

import { CurrentRatingbar } from './current-ratingbar/current-ratingbar';
import { HorizontalRatingbar } from './horizontal-ratingbar/horizontal-ratingbar';
import { MovieRatingbar } from './movie-ratingbar/movie-ratingbar';
import { OneToTenRatingbar } from './one-to-ten-ratingbar/one-to-ten-ratingbar';
import { SquareRatingbar } from './square-ratingbar/square-ratingbar';
import { StarRatingbar } from './star-ratingbar/star-ratingbar';

@Component({
  selector: 'app-rating',
  imports: [
    CurrentRatingbar,
    HorizontalRatingbar,
    MovieRatingbar,
    OneToTenRatingbar,
    SquareRatingbar,
    StarRatingbar,
  ],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating {}
