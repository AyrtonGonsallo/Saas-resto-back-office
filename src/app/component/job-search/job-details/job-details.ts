import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';

import { jobDetail } from '../../../shared/data/job-search/job-search';
import { JobFilter } from '../job-filter/job-filter';
import { SimilarJobs } from './similar-jobs/similar-jobs';

@Component({
  selector: 'app-job-details',
  imports: [JobFilter, SimilarJobs, SlicePipe],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails {
  public jobDetail = jobDetail;
}
