import { Routes } from '@angular/router';

export const Roles: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-role',
        loadComponent: () => import('./creer-role/creer-role').then(m => m.CreerRole),
        data: {
          title: 'Créer un role',
          breadcrumb: 'Créer un role',
        },
      },
      {
        path: 'liste-roles',
        loadComponent: () => import('./roles').then(m => m.Roles),
        data: {
          title: 'Liste des roles',
          breadcrumb: 'Liste des roles',
        },
      },
      
      
    ],
  },
];
