import { Routes } from '@angular/router';

export const RestaurantHorairesRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-horaire-reservation',
        loadComponent: () => import('./ajouter-horaire/ajouter-horaire').then(m => m.AjouterHoraire),
        data: {
          title: 'Créer un horaire de réservation',
          breadcrumb: 'Créer un horaire de réservation',
          parentpath: 'horaires-reservation/liste-horaires-reservation'
        },
      },
      {
        path: 'modifier-horaire-reservation/:id',
        loadComponent: () => import('./modifier-horaire/modifier-horaire').then(m => m.ModifierHoraire),
        data: {
          title: 'Modifier un horaire de réservation',
          breadcrumb: 'Modifier un horaire de réservation',
          parentpath: 'horaires-reservation/liste-horaires-reservation'
        },
      },
      {
        path: 'liste-horaires-reservation',
        loadComponent: () => import('./restautant-horaires').then(m => m.RestautantHoraires),
        data: {
          title: 'Liste des horaires de réservation',
          breadcrumb: 'Liste des horaires de réservation',
        },
      },
      
      
    ],
  },
];
