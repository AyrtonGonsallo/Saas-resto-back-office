import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { ActivityReports } from '../../../../shared/data/dashboard/project/project-chart';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-activity-report',
  imports: [ClickOutsideDirective, NgApexchartsModule],
  templateUrl: './activity-report.html',
  styleUrl: './activity-report.scss',
})
export class ActivityReport {
  public activityChart = ActivityReports;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
