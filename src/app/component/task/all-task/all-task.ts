import { Component, SimpleChanges, input } from '@angular/core';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import * as Data from '../../../shared/data/tasks/task-list';

@Component({
  selector: 'app-all-task',
  imports: [Feathericon],
  templateUrl: './all-task.html',
  styleUrl: './all-task.scss',
})
export class AllTask {
  readonly selectedheading_id = input<number>();
  readonly selectedTagId = input<number>();

  public taskData = Data.TaskData;
  public tagData = Data.TagData;
  public gettaskData: Data.Tasklist;

  ngOnInit(): void {
    this.taskData.map(data => {
      if (data.status) {
        this.gettaskData = data;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let id = changes['selectedheading_id']?.currentValue;
    this.taskData.map(data => {
      if (data.title_id === id) {
        this.gettaskData = data;
      }
    });

    let tagId = changes['selectedTagId']?.currentValue;
    this.tagData.map(data => {
      if (data.title_id === tagId) {
        this.gettaskData = data;
      }
    });
  }
}
