import { Routes } from '@angular/router';

export const PaiementsRoutes: Routes = [
  {
    path: '',
    children: [
      
      
      {
        path: 'liste-paiements',
        loadComponent: () => import('./paiements').then(m => m.Paiements),
        data: {
          title: 'Liste des paiements',
          breadcrumb: 'Liste des paiements',
        },
      },
      
      
    ],
  },
];
