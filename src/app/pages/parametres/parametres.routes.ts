import { Routes } from '@angular/router';

export const ParametresRoutes : Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-parametre',
        loadComponent: () => import('./creer-parametre/creer-parametre').then(m => m.CreerParametre),
        data: {
          title: 'Créer un paramètre',
          breadcrumb: 'Créer un paramètre',
        },
      },
      {
        path: 'modifier-parametre/:id',
        loadComponent: () => import('./modifier-parametre/modifier-parametre').then(m => m.ModifierParametre),
        data: {
          title: 'Modifier un paramètre',
          breadcrumb: 'Modifier un paramètre',
        },
      },
      {
        path: 'liste-parametres',
        loadComponent: () => import('./parametres').then(m => m.Parametres),
        data: {
          title: 'Liste des paramètres',
          breadcrumb: 'Liste des paramètres',
        },
      },
      
      
    ],
  },
];
