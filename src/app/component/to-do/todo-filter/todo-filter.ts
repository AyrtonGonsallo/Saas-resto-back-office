import { Component } from '@angular/core';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';

@Component({
  selector: 'app-todo-filter',
  imports: [Feathericon, ClickOutsideDirective],
  templateUrl: './todo-filter.html',
  styleUrl: './todo-filter.scss',
})
export class TodoFilter {
  public open: boolean = false;

  openFilter() {
    this.open = !this.open;
  }

  clickOutside(): void {
    this.open = false;
  }
}
