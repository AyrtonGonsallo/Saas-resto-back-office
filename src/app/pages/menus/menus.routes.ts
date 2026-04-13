import { Routes } from '@angular/router';

export const MenusRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-menu',
        loadComponent: () => import('./ajouter-menu/ajouter-menu').then(m => m.AjouterMenu),
        data: {
          title: 'Créer un menu',
          breadcrumb: 'Créer un menu',
          parentpath: 'menus/liste-menus'
        },
      },
      {
        path: 'modifier-menu/:id',
        loadComponent: () => import('./modifier-menu/modifier-menu').then(m => m.ModifierMenu),
        data: {
          title: 'Modifier un menu',
          breadcrumb: 'Modifier un menu',
          parentpath: 'menus/liste-menus'
        },
      },
      {
        path: 'liste-menus',
        loadComponent: () => import('./menus').then(m => m.Menus),
        data: {
          title: 'Liste des menus',
          breadcrumb: 'Liste des menus',
        },
      },
      
      
    ],
  },
];
