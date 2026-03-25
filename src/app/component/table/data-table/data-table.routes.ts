import { Routes } from '@angular/router';

export const DataTable: Routes = [
  {
    path: '',
    loadComponent: () => import('./data-table').then(m => m.DataTables),
    data: [
      {
        title: 'Data Table',
        breadcrumb: 'Data Table',
      },
    ],
  },
];
