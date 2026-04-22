import { Routes } from '@angular/router';

export const AvisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'modifier-avis/:id',
        loadComponent: () => import('./modifier-avis/modifier-avis').then(m => m.ModifierAvis),
        data: {
          title: 'Modifier un avis',
          breadcrumb: 'Modifier un avis',
          parentpath: 'avis/liste-avis'
        },
      },
      {
        path: 'liste-avis',
        loadComponent: () => import('./avis').then(m => m.Avis),
        data: {
          title: 'Liste des avis',
          breadcrumb: 'Liste des avis',
        },
      },
    ],
  },
];
