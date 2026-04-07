import { Routes } from '@angular/router';

export const TagsRoutes : Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-tag',
        loadComponent: () => import('./creer-tag/creer-tag').then(m => m.CreerTag),
        data: {
          title: 'Créer un tag',
          breadcrumb: 'Créer un tag',
          parentpath: 'tags/liste-tags'
        },
      },
      {
        path: 'modifier-tag/:id',
        loadComponent: () => import('./modifier-tag/modifier-tag').then(m => m.ModifierTag),
        data: {
          title: 'Modifier un tag',
          breadcrumb: 'Modifier un tag',
          parentpath: 'tags/liste-tags'
        },
      },
      {
        path: 'liste-tags',
        loadComponent: () => import('./tags').then(m => m.Tags),
        data: {
          title: 'Liste des tags',
          breadcrumb: 'Liste des tags',
        },
      },
      
      
    ],
  },
];
