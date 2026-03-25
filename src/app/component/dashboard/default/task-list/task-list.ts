import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';
import { TaskLists } from '../../../../shared/data/dashboard/default/default';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-task-list',
  imports: [RouterModule, ClickOutsideDirective, Feathericon, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  public taskData = TaskLists;
  public isopen: boolean = false;
  public openid: number;

  open() {
    this.isopen = !this.isopen;
  }

  open2(id: number) {
    this.taskData.filter(data => {
      if (data.id == id) {
        data.isActive = !data.isActive;
      }
    });
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
