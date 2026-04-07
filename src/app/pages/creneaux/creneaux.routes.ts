import { Routes } from '@angular/router';

export const CreneauxRoutes : Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-creneau',
        loadComponent: () => import('./creer-creneau/creer-creneau').then(m => m.CreerCreneau),
        data: {
          title: 'Créer un créneau',
          breadcrumb: 'Créer un créneau',
          parentpath: 'creneaus/liste-creneaus'
        },
      },
      {
        path: 'modifier-creneau/:id',
        loadComponent: () => import('./modifier-creneau/modifier-creneau').then(m => m.ModifierCreneau),
        data: {
          title: 'Modifier un créneau',
          breadcrumb: 'Modifier un créneau',
          parentpath: 'creneaus/liste-creneaux'
        },
      },
      {
        path: 'liste-creneaux',
        loadComponent: () => import('./creneaux').then(m => m.Creneaux),
        data: {
          title: 'Liste des créneaux',
          breadcrumb: 'Liste des créneaux',
        },
      },
      
      
    ],
  },
];
