import { Routes } from '@angular/router';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-table',
        loadComponent: () => import('./creer-table/creer-table').then(m => m.CreerTable),
        data: {
          title: 'Créer un table',
          breadcrumb: 'Créer un table',
        },
      },
      {
        path: 'modifier-table/:id',
        loadComponent: () => import('./modifier-table/modifier-table').then(m => m.ModifierTable),
        data: {
          title: 'Modifier un table',
          breadcrumb: 'Modifier un table',
        },
      },
      {
        path: 'liste-tables',
        loadComponent: () => import('./tables').then(m => m.Tables),
        data: {
          title: 'Liste des tables',
          breadcrumb: 'Liste des tables',
        },
      },
      
      
    ],
  },
];
