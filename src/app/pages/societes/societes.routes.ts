import { Routes } from '@angular/router';

export const SocietesRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-societe',
        loadComponent: () => import('./creer-societe/creer-societe').then(m => m.CreerSociete),
        data: {
          title: 'Créer une société',
          breadcrumb: 'Créer une société',
          parentpath: 'societes/liste-societes'
        },
      },
      {
        path: 'modifier-societe/:id',
        loadComponent: () => import('./modifier-societe/modifier-societe').then(m => m.ModifierSociete),
        data: {
          title: 'Modifier une société',
          breadcrumb: 'Modifier une société',
          parentpath: 'societes/liste-societes'
        },
      },
      {
        path: 'liste-societes',
        loadComponent: () => import('./societes').then(m => m.Societes),
        data: {
          title: 'Liste des sociétés',
          breadcrumb: 'Liste des sociétés',
        },
      },
      
      
    ],
  },
];
