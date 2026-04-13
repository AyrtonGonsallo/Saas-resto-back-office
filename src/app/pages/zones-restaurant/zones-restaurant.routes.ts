import { Routes } from '@angular/router';

export const ZonesRestaurantRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-zone',
        loadComponent: () => import('./ajouter-zone/ajouter-zone').then(m => m.AjouterZone),
        data: {
          title: 'Créer une zone de restautant',
          breadcrumb: 'Créer une zone de restautant',
          parentpath: 'zones-restaurant/liste-zones-restaurant'
        },
      },
      {
        path: 'modifier-zone/:id',
        loadComponent: () => import('./modifier-zone/modifier-zone').then(m => m.ModifierZone),
        data: {
          title: 'Modifier une zone de restautant',
          breadcrumb: 'Modifier une zone de restautant',
          parentpath: 'zones-restaurant/liste-zones-restaurant'
        },
      },
      {
        path: 'liste-zones-restaurant',
        loadComponent: () => import('./zones-restaurant').then(m => m.ZonesRestaurant),
        data: {
          title: 'Liste des zones de restautant',
          breadcrumb: 'Liste des zones de restautant',
        },
      },
      
      
    ],
  },
];
