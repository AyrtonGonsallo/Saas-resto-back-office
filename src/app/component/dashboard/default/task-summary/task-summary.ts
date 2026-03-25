import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { TaskSummaryData } from '../../../../shared/data/dashboard/default/default';
import { TaskSummaryChart } from '../../../../shared/data/dashboard/default/default-charts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-task-summary',
  imports: [NgApexchartsModule, ClickOutsideDirective],
  templateUrl: './task-summary.html',
  styleUrl: './task-summary.scss',
})
export class TaskSummary {
  public TaskSummaryData = TaskSummaryData;
  public TaskSummaryChartData = TaskSummaryChart;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
