import { Routes } from '@angular/router';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-table',
        loadComponent: () => import('./creer-table/creer-table').then(m => m.CreerTable),
        data: {
          title: 'Créer une table',
          breadcrumb: 'Créer une table',
          parentpath: 'tables/liste-tables'
        },
      },
      {
        path: 'modifier-table/:id',
        loadComponent: () => import('./modifier-table/modifier-table').then(m => m.ModifierTable),
        data: {
          title: 'Modifier une table',
          breadcrumb: 'Modifier une table',
          parentpath: 'tables/liste-tables'
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
