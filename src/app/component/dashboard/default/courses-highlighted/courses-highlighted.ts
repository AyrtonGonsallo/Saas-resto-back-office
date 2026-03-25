import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoursesHighlight } from '../../../../shared/data/dashboard/default/default';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-courses-highlighted',
  imports: [ClickOutsideDirective, RouterModule],
  templateUrl: './courses-highlighted.html',
  styleUrl: './courses-highlighted.scss',
})
export class CoursesHighlighted {
  public coursesData = CoursesHighlight;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
