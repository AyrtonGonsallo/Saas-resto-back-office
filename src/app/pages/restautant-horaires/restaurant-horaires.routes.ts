import { Routes } from '@angular/router';

export const RestaurantHorairesRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-horaire',
        loadComponent: () => import('./ajouter-horaire/ajouter-horaire').then(m => m.AjouterHoraire),
        data: {
          title: 'Créer un horaire',
          breadcrumb: 'Créer un horaire',
          parentpath: 'horaires/liste-horaires'
        },
      },
      {
        path: 'modifier-horaire/:id',
        loadComponent: () => import('./modifier-horaire/modifier-horaire').then(m => m.ModifierHoraire),
        data: {
          title: 'Modifier un horaire',
          breadcrumb: 'Modifier un horaire',
          parentpath: 'horaires/liste-horaires'
        },
      },
      {
        path: 'liste-horaires',
        loadComponent: () => import('./restautant-horaires').then(m => m.RestautantHoraires),
        data: {
          title: 'Liste des horaires',
          breadcrumb: 'Liste des horaires',
        },
      },
      
      
    ],
  },
];
