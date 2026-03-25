import { Routes } from '@angular/router';

export const bootstrapTables: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic-table',
        loadComponent: () => import('./basic-tables/basic-tables').then(m => m.BasicTables),
        data: {
          title: 'Bootstrap Basic Tables',
          breadcrumb: 'Bootstrap Basic Tables',
        },
      },
      {
        path: 'table-components',
        loadComponent: () =>
          import('./table-component/table-component').then(m => m.TableComponent),
        data: {
          title: 'Table Components',
          breadcrumb: 'Table Components',
        },
      },
    ],
  },
];
