import { Component } from '@angular/core';

import { ActivityReport } from './activity-report/activity-report';
import { Calender } from './calender/calender';
import { ProjectProgress } from './project-progress/project-progress';
import { ProjectsOverview } from './projects-overview/projects-overview';
import { Tasks } from './tasks/tasks';
import { TeamMembers } from './team-members/team-members';
import { ToDoList } from './to-do-list/to-do-list';
import { TotalClients } from './total-clients/total-clients';
import { TotalProject } from './total-project/total-project';
import { TotalRevenue } from './total-revenue/total-revenue';

@Component({
  selector: 'app-project',
  imports: [
    ActivityReport,
    Calender,
    ProjectProgress,
    Tasks,
    TeamMembers,
    ProjectsOverview,
    ToDoList,
    TotalClients,
    TotalRevenue,
    TotalProject,
  ],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {}
