import { Routes } from '@angular/router';

export const ServicesRoutes : Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-service',
        loadComponent: () => import('./creer-service/creer-service').then(m => m.CreerService),
        data: {
          title: 'Créer un service',
          breadcrumb: 'Créer un service',
          parentpath: 'services/liste-services'
        },
      },
      {
        path: 'modifier-service/:id',
        loadComponent: () => import('./modifier-service/modifier-service').then(m => m.ModifierService),
        data: {
          title: 'Modifier un service',
          breadcrumb: 'Modifier un service',
          parentpath: 'services/liste-services'
        },
      },
      {
        path: 'liste-services',
        loadComponent: () => import('./services').then(m => m.Services),
        data: {
          title: 'Liste des services',
          breadcrumb: 'Liste des services',
        },
      },
      
      
    ],
  },
];
