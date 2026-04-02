import { Routes } from '@angular/router';

export const UtilisateursRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-utilisateur',
        loadComponent: () => import('./creer-utilisateur/creer-utilisateur').then(m => m.CreerUtilisateur),
        data: {
          title: 'Créer un utilisateur',
          breadcrumb: 'Créer un utilisateur',
          parentpath: 'utilisateurs/liste-utilisateurs'
        },
      },
      {
        path: 'modifier-utilisateur/:id',
        loadComponent: () => import('./modifier-utilisateur/modifier-utilisateur').then(m => m.ModifierUtilisateur),
        data: {
          title: 'Modifier un utilisateur',
          breadcrumb: 'Modifier un utilisateur',
          parentpath: 'utilisateurs/liste-utilisateurs'
        },
      },
      {
        path: 'liste-utilisateurs',
        loadComponent: () => import('./utilisateurs').then(m => m.Utilisateurs),
        data: {
          title: 'Liste des utilisateurs',
          breadcrumb: 'Liste des utilisateurs',
        },
      },
      
      
    ],
  },
];
