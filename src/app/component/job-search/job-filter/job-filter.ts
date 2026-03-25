import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as Data from '../../../shared/data/job-search/job-search';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';

@Component({
  selector: 'app-job-filter',
  imports: [NgbModule, ClickOutsideDirective],
  templateUrl: './job-filter.html',
  styleUrl: './job-filter.scss',
})
export class JobFilter {
  public filterData = Data.filterData;
  public filterChackBox = Data.filterChackBox;
  public isCollapsed = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public isCollapsed4 = false;
  public Open: boolean = false;

  openFilter() {
    this.Open = !this.Open;
  }

  clickOutside(): void {
    this.Open = false;
  }
}
