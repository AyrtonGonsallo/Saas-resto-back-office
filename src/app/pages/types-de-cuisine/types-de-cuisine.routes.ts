import { Routes } from '@angular/router';

export const TypesDeCuisineRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-type-cuisine',
        loadComponent: () => import('./ajouter-type/ajouter-type').then(m => m.AjouterType),
        data: {
          title: 'Créer un type de cuisine',
          breadcrumb: 'Créer un type de cuisine',
          parentpath: 'types-de-cuisine/liste-types-cuisine'
        },
      },
      {
        path: 'modifier-type-cuisine/:id',
        loadComponent: () => import('./modifier-type/modifier-type').then(m => m.ModifierType),
        data: {
          title: 'Modifier un type de cuisine',
          breadcrumb: 'Modifier un type de cuisine',
          parentpath: 'types-de-cuisine/liste-types-cuisine'
        },
      },
      {
        path: 'liste-types-cuisine',
        loadComponent: () => import('./types-de-cuisine').then(m => m.TypesDeCuisine),
        data: {
          title: 'Liste des types de cuisine',
          breadcrumb: 'Liste des types de cuisine',
        },
      },
      
      
    ],
  },
];
