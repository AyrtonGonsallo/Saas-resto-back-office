import { Component, inject, input } from '@angular/core';

import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { featuredTutorial } from '../../../shared/data/faq/faq';

@Component({
  selector: 'app-featured-tutorials',
  imports: [NgbModule],
  templateUrl: './featured-tutorials.html',
  styleUrl: './featured-tutorials.scss',
})
export class FeaturedTutorials {
  readonly data = input<featuredTutorial[]>();

  public config = inject(NgbRatingConfig);

  constructor() {
    this.config.max = 5;
    this.config.readonly = true;
  }
}
