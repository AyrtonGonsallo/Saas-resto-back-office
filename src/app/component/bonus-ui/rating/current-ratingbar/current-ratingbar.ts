import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalfAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-current-ratingbar',
  imports: [FormsModule, NgbModule, BarRatingModule, FontAwesomeModule],
  templateUrl: './current-ratingbar.html',
  styleUrl: './current-ratingbar.scss',
})
export class CurrentRatingbar {
  public faoRate = 5.6;
  public faoRated = false;

  onFaoRate(e: number) {
    this.faoRated = true;
    this.faoRate = e;
  }
  ctrl = new FormControl<number | null>(null, Validators.required);

  faoReset() {
    this.faoRated = false;
    this.faoRate = 5.6;
  }
  private library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(faStar, faStarHalfAlt, farStar, faTimesCircle);
  }
}
