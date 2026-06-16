import { Routes } from '@angular/router';

export const RestaurantClickAndCollectHorairesRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-horaire-click-and-collect',
        loadComponent: () => import('./ajouter-horaire/ajouter-horaire').then(m => m.AjouterHoraire),
        data: {
          title: 'Créer un horaire click & collect',
          breadcrumb: 'Créer un horaire click & collect',
          parentpath: 'horaires-click-and-collect/liste-horaires-click-and-collect'
        },
      },
      {
        path: 'modifier-horaire-click-and-collect/:id',
        loadComponent: () => import('./modifier-horaire/modifier-horaire').then(m => m.ModifierHoraire),
        data: {
          title: 'Modifier un horaire click & collect',
          breadcrumb: 'Modifier un horaire click & collect',
          parentpath: 'horaires-click-and-collect/liste-horaires-click-and-collect'
        },
      },
      {
        path: 'liste-horaires-click-and-collect',
        loadComponent: () => import('./restaurant-horaires-click-and-collect').then(m => m.RestaurantHorairesClickAndCollect),
        data: {
          title: 'Liste des horaires click & collect',
          breadcrumb: 'Liste des horaires click & collect',
        },
      },
      
      
    ],
  },
];
