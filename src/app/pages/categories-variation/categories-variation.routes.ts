import { Routes } from '@angular/router';

export const CategoriesVariationRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-categorie-variation',
        loadComponent: () => import('./creer-categorie-variation/creer-categorie-variation').then(m => m.CreerCategorieVariation),
        data: {
          title: 'Créer une catégorie de variation',
          breadcrumb: 'Créer une catégorie de variation',
          parentpath: 'categories-variation/liste-categories-variation'
        },
      },
      {
        path: 'modifier-categorie-variation/:id',
        loadComponent: () => import('./modifier-categorie-variation/modifier-categorie-variation').then(m => m.ModifierCategorieVariation),
        data: {
          title: 'Modifier une catégorie de variation',
          breadcrumb: 'Modifier une catégorie de variation',
          parentpath: 'categories-variation/liste-categories-variation'
        },
      },
      {
        path: 'liste-categories-variation',
        loadComponent: () => import('./categories-variation').then(m => m.CategoriesVariation),
        data: {
          title: 'Liste des catégories de variation',
          breadcrumb: 'Liste des catégories de variation',
        },
      },
      
      
    ],
  },
];
