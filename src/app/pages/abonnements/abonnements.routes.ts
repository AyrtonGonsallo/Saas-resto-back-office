import { Routes } from '@angular/router';

export const AbonnementsRoutes: Routes = [
  {
    path: '',
    children: [
      
     
      {
        path: 'modifier-abonnement/:id',
        loadComponent: () => import('./modifier-abonnement/modifier-abonnement').then(m => m.ModifierAbonnement),
        data: {
          title: 'Modifier un abonnement',
          breadcrumb: 'Modifier un abonnement',
        },
      },
      
      
    ],
  },
];
