import { Routes } from '@angular/router';

export const RolesRoutes : Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-role',
        loadComponent: () => import('./creer-role/creer-role').then(m => m.CreerRole),
        data: {
          title: 'Créer un rôle',
          breadcrumb: 'Créer un rôle',
          parentpath: 'roles/liste-roles'
        },
      },
      {
        path: 'modifier-role/:id',
        loadComponent: () => import('./modifier-role/modifier-role').then(m => m.ModifierRole),
        data: {
          title: 'Modifier un rôle',
          breadcrumb: 'Modifier un rôle',
          parentpath: 'roles/liste-roles'
        },
      },
      {
        path: 'liste-roles',
        loadComponent: () => import('./roles').then(m => m.Roles),
        data: {
          title: 'Liste des rôle',
          breadcrumb: 'Liste des rôles',
        },
      },
      
      
    ],
  },
];
