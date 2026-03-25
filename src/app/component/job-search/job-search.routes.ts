import { Routes } from '@angular/router';

export const JobSearch: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cards-view',
        loadComponent: () => import('./cards-view/cards-view').then(m => m.CardsView),
        data: {
          title: 'Cards View',
          breadcrumb: 'Cards View',
        },
      },
      {
        path: 'list-view',
        loadComponent: () => import('./list-view/list-view').then(m => m.ListView),
        data: {
          title: 'List View',
          breadcrumb: 'List View',
        },
      },
      {
        path: 'job-details',
        loadComponent: () => import('./job-details/job-details').then(m => m.JobDetails),
        data: {
          title: 'Job Details',
          breadcrumb: 'Job Details',
        },
      },
      {
        path: 'apply',
        loadComponent: () => import('./apply/apply').then(m => m.Apply),
        data: {
          title: 'Apply',
          breadcrumb: 'Apply',
        },
      },
    ],
  },
];
