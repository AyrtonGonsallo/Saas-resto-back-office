import { Routes } from '@angular/router';

export const ErrorPages: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error-page1',
        loadComponent: () => import('./error-page-1/error-page-1').then(m => m.ErrorPage1),
      },
      {
        path: 'error-page2',
        loadComponent: () => import('./error-page-2/error-page-2').then(m => m.ErrorPage2),
      },
      {
        path: 'error-page3',
        loadComponent: () => import('./error-page-3/error-page-3').then(m => m.ErrorPage3),
      },
      {
        path: 'error-page4',
        loadComponent: () => import('./error-page-4/error-page-4').then(m => m.ErrorPage4),
      },
      {
        path: 'error-page5',
        loadComponent: () => import('./error-page-5/error-page-5').then(m => m.ErrorPage5),
      },
      {
        path: 'error-page6',
        loadComponent: () => import('./error-page-6/error-page-6').then(m => m.ErrorPage6),
      },
    ],
  },
];
