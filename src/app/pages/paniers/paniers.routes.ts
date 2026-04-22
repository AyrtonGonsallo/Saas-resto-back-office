import { Routes } from '@angular/router';

export const PaniersRoutes: Routes = [
  {
    path: '',
    children: [
      
      
      {
        path: 'liste-paniers',
        loadComponent: () => import('./paniers').then(m => m.Paniers),
        data: {
          title: 'Liste des paniers',
          breadcrumb: 'Liste des paniers',
        },
      },
      
      
    ],
  },
];
