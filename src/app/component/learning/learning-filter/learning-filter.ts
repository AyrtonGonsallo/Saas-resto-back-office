import { Component } from '@angular/core';

import { Categories } from './categories/categories';
import { FindCource } from './find-cource/find-cource';
import { UpcomingCource } from './upcoming-cource/upcoming-cource';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';

@Component({
  selector: 'app-learning-filter',
  imports: [Categories, FindCource, UpcomingCource, ClickOutsideDirective],
  templateUrl: './learning-filter.html',
  styleUrl: './learning-filter.scss',
})
export class LearningFilter {
  public isCollapsed: boolean = false;

  openFilter() {
    this.isCollapsed = !this.isCollapsed;
  }

  clickOutside(): void {
    this.isCollapsed = false;
  }
}
