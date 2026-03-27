import { Routes } from '@angular/router';

export const ProduitsRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-produit',
        loadComponent: () => import('./creer-produit/creer-produit').then(m => m.CreerProduit),
        data: {
          title: 'Créer un produit',
          breadcrumb: 'Créer un produit',
        },
      },
      {
        path: 'modifier-produit/:id',
        loadComponent: () => import('./modifier-produit/modifier-produit').then(m => m.ModifierProduit),
        data: {
          title: 'Modifier un produit',
          breadcrumb: 'Modifier un produit',
        },
      },
      {
        path: 'liste-produits',
        loadComponent: () => import('./produits').then(m => m.Produits),
        data: {
          title: 'Liste des produits',
          breadcrumb: 'Liste des produits',
        },
      },
      
      
    ],
  },
];
