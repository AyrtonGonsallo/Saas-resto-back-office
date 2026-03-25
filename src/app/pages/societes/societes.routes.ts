import { Routes } from '@angular/router';

export const Societe: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-societe',
        loadComponent: () => import('./creer-societe/creer-societe').then(m => m.CreerSociete),
        data: {
          title: 'Créer une société',
          breadcrumb: 'Créer une société',
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
