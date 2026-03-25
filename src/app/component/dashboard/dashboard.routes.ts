import { Routes } from '@angular/router';

export const dashboard: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        loadComponent: () => import('./default/default').then(m => m.Default),
        data: {
          title: 'Default Dashboard',
          breadcrumb: 'Default',
        },
      },
      {
        path: 'ecommerce',
        loadComponent: () => import('./ecommerce/ecommerce').then(m => m.Ecommerce),
        data: {
          title: 'Ecommerce Dashboard',
          breadcrumb: 'Ecommerce Dashboard',
        },
      },
      {
        path: 'project',
        loadComponent: () => import('./project/project').then(m => m.Project),
        data: {
          title: 'Project Dashboard',
          breadcrumb: 'Project Dashboard',
        },
      },
    ],
  },
];
