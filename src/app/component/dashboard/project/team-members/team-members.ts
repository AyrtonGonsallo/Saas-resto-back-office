import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonTeamChart } from './common-team-chart/common-team-chart';
import { TeamMember } from '../../../../shared/data/dashboard/project/project-chart';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-team-members',
  imports: [ClickOutsideDirective, RouterModule, CommonTeamChart],
  templateUrl: './team-members.html',
  styleUrl: './team-members.scss',
})
export class TeamMembers {
  public TeamData = TeamMember;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
