import { Routes } from '@angular/router';

export const Bookmark: Routes = [
  {
    path: '',
    loadComponent: () => import('./bookmarks').then(m => m.Bookmarks),
    data: {
      title: 'Bookmarks',
      breadcrumb: 'Bookmarks',
    },
  },
];
