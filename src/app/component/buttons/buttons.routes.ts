import { Routes } from '@angular/router';

export const Button: Routes = [
  {
    path: '',
    loadComponent: () => import('./buttons').then(m => m.Buttons),
  },
];
