import { Routes } from '@angular/router';

export const CategoriesProduitRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-categorie-produit',
        loadComponent: () => import('./creer-categorie-produit/creer-categorie-produit').then(m => m.CreerCategorieProduit),
        data: {
          title: 'Créer une catégorie de produit',
          breadcrumb: 'Créer une catégorie de produit',
        },
      },
      {
        path: 'modifier-categorie-produit/:id',
        loadComponent: () => import('./modifier-categorie-produit/modifier-categorie-produit').then(m => m.ModifierCategorieProduit),
        data: {
          title: 'Modifier une catégorie de produit',
          breadcrumb: 'Modifier une catégorie de produit',
        },
      },
      {
        path: 'liste-categories-produit',
        loadComponent: () => import('./categories-produit').then(m => m.CategoriesProduit),
        data: {
          title: 'Liste des catégories de produit',
          breadcrumb: 'Liste des catégories de produit',
        },
      },
      
      
    ],
  },
];
