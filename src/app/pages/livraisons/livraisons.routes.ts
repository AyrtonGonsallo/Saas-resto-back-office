import { Routes } from '@angular/router';

export const LivraisonsRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-livraison',
        loadComponent: () => import('./creer-livraison/creer-livraison').then(m => m.CreerLivraison),
        data: {
          title: 'Créer une livraison',
          breadcrumb: 'Créer une livraison',
          parentpath: 'livraisons/liste-livraisons'
        },
      },
      {
        path: 'modifier-livraison/:id',
        loadComponent: () => import('./modifier-livraison/modifier-livraison').then(m => m.ModifierLivraison),
        data: {
          title: 'Modifier une livraison',
          breadcrumb: 'Modifier une livraison',
          parentpath: 'livraisons/liste-livraisons'
        },
      },
      {
        path: 'liste-livraisons',
        loadComponent: () => import('./livraisons').then(m => m.Livraisons),
        data: {
          title: 'Liste des livraisons',
          breadcrumb: 'Liste des livraisons',
        },
      },
      
      
    ],
  },
];
