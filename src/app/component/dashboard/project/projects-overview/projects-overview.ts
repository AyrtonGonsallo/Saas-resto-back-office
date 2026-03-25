import { Component } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { ProjectOverView } from '../../../../shared/data/dashboard/project/project-chart';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-projects-overview',
  imports: [ClickOutsideDirective, NgApexchartsModule],
  templateUrl: './projects-overview.html',
  styleUrl: './projects-overview.scss',
})
export class ProjectsOverview {
  public ProjectOverView = ProjectOverView;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
