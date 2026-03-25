import { SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { jobCardsData } from '../../../shared/data/job-search/job-search';
import { JobFilter } from '../job-filter/job-filter';

@Component({
  selector: 'app-list-view',
  imports: [NgbModule, JobFilter, SlicePipe],
  templateUrl: './list-view.html',
  styleUrl: './list-view.scss',
})
export class ListView {
  public jobCardsData = jobCardsData;
  public rating = 5;

  public config = inject(NgbRatingConfig);

  constructor() {
    this.config.max = 5;
    this.config.readonly = true;
  }
}
