import { Routes } from '@angular/router';

export const VariationsProduitRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-variation-produit/:produit_id',
        loadComponent: () => import('./creer-variation-produit/creer-variation-produit').then(m => m.CreerVariationProduit),
        data: {
          title: 'Créer une variation de produit',
          breadcrumb: 'Créer une variation de produit',
        },
      },
      {
        path: 'modifier-variation-produit/:id',
        loadComponent: () => import('./modifier-variation-produit/modifier-variation-produit').then(m => m.ModifierVariationProduit),
        data: {
          title: 'Modifier une variation de produit',
          breadcrumb: 'Modifier une variation de produit',
        },
      },
      {
        path: 'liste-variations-produit',
        loadComponent: () => import('./variations-produit').then(m => m.VariationsProduit),
        data: {
          title: 'Liste des variations de produit',
          breadcrumb: 'Liste des variations de produit',
        },
      },
      
      
    ],
  },
];
