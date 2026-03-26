import { Routes } from '@angular/router';

export const RestaurantsRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-restaurant',
        loadComponent: () => import('./creer-restaurant/creer-restaurant').then(m => m.CreerRestaurant),
        data: {
          title: 'Créer un restaurant',
          breadcrumb: 'Créer un restaurant',
        },
      },
      {
        path: 'modifier-restaurant/:id',
        loadComponent: () => import('./modifier-restaurant/modifier-restaurant').then(m => m.ModifierRestaurant),
        data: {
          title: 'Modifier un restaurant',
          breadcrumb: 'Modifier un restaurant',
        },
      },
      {
        path: 'liste-restaurants',
        loadComponent: () => import('./restaurants').then(m => m.Restaurants),
        data: {
          title: 'Liste des restaurants',
          breadcrumb: 'Liste des restaurants',
        },
      },
      
      
    ],
  },
];
