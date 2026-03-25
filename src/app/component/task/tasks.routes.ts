import { Routes } from '@angular/router';

export const Tasks: Routes = [
  {
    path: '',
    loadComponent: () => import('./task').then(m => m.Task),
    data: {
      title: 'Tasks',
      breadcrumb: 'Tasks',
    },
  },
];
