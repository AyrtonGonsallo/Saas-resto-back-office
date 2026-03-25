import { Component, inject } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import * as Data from '../../../shared/data/tasks/task-list';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';
import { AllTask } from '../all-task/all-task';
import { AddtaskTag } from '../task-modal/addtask-tag/addtask-tag';
import { NewTask } from '../task-modal/new-task/new-task';

@Component({
  selector: 'app-task-sidebar',
  imports: [ClickOutsideDirective, AllTask, Feathericon],
  templateUrl: './task-sidebar.html',
  styleUrl: './task-sidebar.scss',
})
export class TaskSidebar {
  selectedheading_id: number;
  selectedTagId: number;

  public taskSidemenu = Data.TaskData;
  public taskTagSidemenu = Data.TagData;
  public open: boolean = false;

  private modalService = inject(NgbModal);

  getData(title_id: number) {
    const getHeadingData = this.taskSidemenu.filter(data => {
      return data.title_id === title_id;
    });
    this.selectedheading_id = getHeadingData[0].title_id;
  }

  getTagData(title_id: number) {
    const getTagData = this.taskTagSidemenu.filter(data => {
      return data.title_id === title_id;
    });

    this.selectedTagId = getTagData[0].title_id;
  }

  openMenu() {
    this.open = !this.open;
  }

  openAddTask() {
    this.modalService.open(NewTask, { size: 'lg' });
  }

  openAddTag() {
    this.modalService.open(AddtaskTag, { size: 'lg' });
  }

  clickOutside(): void {
    this.open = false;
  }
}
