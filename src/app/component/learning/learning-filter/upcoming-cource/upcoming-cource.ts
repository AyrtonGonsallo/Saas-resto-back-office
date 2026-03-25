import { Component, inject } from '@angular/core';

import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { upcomingCourse } from '../../../../shared/data/learning/learning';

@Component({
  selector: 'app-upcoming-cource',
  imports: [NgbModule],
  templateUrl: './upcoming-cource.html',
  styleUrl: './upcoming-cource.scss',
})
export class UpcomingCource {
  public upcomingCourse = upcomingCourse;
  public isCollapsed = false;

  public config = inject(NgbRatingConfig);

  constructor() {
    this.config.max = 5;
    this.config.readonly = true;
  }
}
