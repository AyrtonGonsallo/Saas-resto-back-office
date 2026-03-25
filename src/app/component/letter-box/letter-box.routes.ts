import { Routes } from '@angular/router';

export const Email: Routes = [
  {
    path: '',
    loadComponent: () => import('./letter-box').then(m => m.LetterBox),
    data: {
      breadcrumb: 'Letter Box',
    },
  },
];
