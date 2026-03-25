import { Routes } from '@angular/router';

export const Invoice: Routes = [
  {
    path: '',
    children: [
      {
        path: 'invoice1',
        loadComponent: () => import('./invoice-1/invoice-1').then(m => m.Invoice1),
        data: {
          title: 'Invoice',
          breadcrumb: 'Invoice',
        },
      },
      {
        path: 'invoice2',
        loadComponent: () => import('./invoice-2/invoice-2').then(m => m.Invoice2),
        data: {
          title: 'Invoice',
          breadcrumb: 'Invoice',
        },
      },
      {
        path: 'invoice3',
        loadComponent: () => import('./invoice-3/invoice-3').then(m => m.Invoice3),
        data: {
          title: 'Invoice',
          breadcrumb: 'Invoice',
        },
      },
      {
        path: 'invoice4',
        loadComponent: () => import('./invoice-4/invoice-4').then(m => m.Invoice4),
        data: {
          title: 'Invoice',
          breadcrumb: 'Invoice',
        },
      },
      {
        path: 'invoice5',
        loadComponent: () => import('./invoice-5/invoice-5').then(m => m.Invoice5),
        data: {
          title: 'Invoice',
          breadcrumb: 'Invoice',
        },
      },
      {
        path: 'invoice6',
        loadComponent: () => import('./invoice-6/invoice-6').then(m => m.Invoice6),
        data: {
          title: 'Invoice',
          breadcrumb: 'Invoice',
        },
      },
    ],
  },
];
