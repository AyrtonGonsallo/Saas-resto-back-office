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
          parentpath: 'societes/liste-societes'
        },
      },
      {
        path: 'liste-portefeuilles',
        loadComponent: () => import('./portefeuilles').then(m => m.Portefeuilles),
        data: {
          title: 'Liste des portefeuilles',
          breadcrumb: 'Liste des portefeuilles',
        },
      },
      
      
    ],
  },
];
