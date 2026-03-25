import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoList } from '../../../../shared/data/dashboard/project/project';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ClickOutsideDirective],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList {
  public TodoData = TodoList;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
