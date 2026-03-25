import { Component } from '@angular/core';

import { Projectprogress } from '../../../../shared/data/dashboard/project/project';

@Component({
  selector: 'app-project-progress',
  templateUrl: './project-progress.html',
  styleUrl: './project-progress.scss',
})
export class ProjectProgress {
  public projectProgress = Projectprogress;
}
