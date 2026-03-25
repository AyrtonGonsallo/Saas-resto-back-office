import { SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { jobCardsData } from '../../../../shared/data/job-search/job-search';

@Component({
  selector: 'app-similar-jobs',
  imports: [NgbModule, SlicePipe],
  templateUrl: './similar-jobs.html',
  styleUrl: './similar-jobs.scss',
})
export class SimilarJobs {
  public jobCardsData = jobCardsData;
  public rating = 3;

  public config = inject(NgbRatingConfig);

  constructor() {
    this.config.max = 5;
    this.config.readonly = true;
  }
}
