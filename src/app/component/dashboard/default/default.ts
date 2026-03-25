import { Component } from '@angular/core';

import { AllInvoices } from './all-invoices/all-invoices';
import { CoursesHighlighted } from './courses-highlighted/courses-highlighted';
import { Investing } from './investing/investing';
import { MonthlyOverview } from './monthly-overview/monthly-overview';
import { Notifications } from './notifications/notifications';
import { ProjectOverview } from './project-overview/project-overview';
import { ScheduleTime } from './schedule-time/schedule-time';
import { TaskList } from './task-list/task-list';
import { TaskSummary } from './task-summary/task-summary';
import { TopCard } from './top-card/top-card';
import { TopCommonChart } from './top-common-chart/top-common-chart';
import { TotalEarning } from './total-earning/total-earning';
import { TotalInvestment } from './total-investment/total-investment';
import { TotalVisit } from './total-visit/total-visit';
import { TotalClients, NewProject } from '../../../shared/data/dashboard/default/default-charts';

@Component({
  selector: 'app-default',
  imports: [
    AllInvoices,
    CoursesHighlighted,
    Investing,
    MonthlyOverview,
    Notifications,
    ProjectOverview,
    ScheduleTime,
    TaskList,
    TaskSummary,
    TopCard,
    TopCommonChart,
    TotalEarning,
    TotalInvestment,
    TotalVisit,
  ],
  templateUrl: './default.html',
  styleUrl: './default.scss',
})
export class Default {
  public TotalClientsData = TotalClients;
  public newProjectData = NewProject;
}
