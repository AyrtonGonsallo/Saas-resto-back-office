import { Routes } from '@angular/router';

import { AdminGuard } from './shared/guard/admin.guard';
import { fullRoutes } from './shared/routes/full-routes';
import { dashData } from './shared/routes/routes';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login),
  },
  {
    path: '',
    redirectTo: '/dashboard/default',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./shared/component/layout/content/content').then(m => m.Content),
    children: dashData,
    canActivate: [AdminGuard],
  },
  {
    path: '',
    loadComponent: () => import('./shared/component/layout/full/full').then(m => m.Full),
    children: fullRoutes,
  }
];
