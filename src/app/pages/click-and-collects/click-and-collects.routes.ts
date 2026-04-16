import { Routes } from '@angular/router';

export const ClickAndCollectRoutes: Routes = [
  {
    path: '',
    children: [
      
      
      {
        path: 'modifier-commande/:id',
        loadComponent: () => import('./modifier-commande/modifier-commande').then(m => m.ModifierCommande),
        data: {
          title: 'Modifier une commande',
          breadcrumb: 'Modifier une commande',
          parentpath: 'commandes/liste-commandes'
        },
      },
      {
        path: 'liste-commandes',
        loadComponent: () => import('./click-and-collects').then(m => m.ClickAndCollects),
        data: {
          title: 'Liste des commandes',
          breadcrumb: 'Liste des commandes',
        },
      },
      
      
    ],
  },
];
