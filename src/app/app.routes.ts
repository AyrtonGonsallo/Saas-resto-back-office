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
  },
  {
    path: 'reservations/formulaire-reservation/:societe_id/:restaurant_id',
    loadComponent: () => import('./pages/reservations/formulaire-reservation/formulaire-reservation').then(m => m.FormulaireReservation),
    data: {
      title: 'Formulaire de réservation',
      breadcrumb: 'Formulaire de réservation',
      parentpath: 'reservations/liste-reservations'
    },
  },
  {
    path: 'click-and-collects/formulaire-click-and-collect/:societe_id',
    loadComponent: () => import('./pages/click-and-collects/formulaire-click-and-collect/formulaire-click-and-collect').then(m => m.FormulaireClickAndCollect),
    data: {
      title: 'Formulaire de click and collect',
      breadcrumb: 'Formulaire de click and collect',
      parentpath: 'commandes/liste-commandes'
    },
  },
];
