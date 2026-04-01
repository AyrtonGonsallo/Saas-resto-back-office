import { Routes } from '@angular/router';

export const PortefeuillesRoutes: Routes = [
  {
    path: '',
    children: [
      
     
      {
        path: 'modifier-portefeuille/:id',
        loadComponent: () => import('./modifier-portefeuille/modifier-portefeuille').then(m => m.ModifierPortefeuille),
        data: {
          title: 'Modifier un portefeuille',
          breadcrumb: 'Modifier un portefeuille',
        },
      },
      
      
    ],
  },
];
