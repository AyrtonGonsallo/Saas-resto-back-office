import { Routes } from '@angular/router';

export const User: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users-profile',
        loadComponent: () => import('./users-profile/users-profile').then(m => m.UsersProfile),
        data: {
          title: 'User Profile',
          breadcrumb: 'User Profile',
        },
      },
      {
        path: 'profile-edit',
        loadComponent: () => import('./users-edit/users-edit').then(m => m.UsersEdit),
        data: {
          title: 'Edit Profile',
          breadcrumb: 'Edit Profile',
        },
      },
      
      {
        path: 'users-cards',
        loadComponent: () => import('./users-cards/users-cards').then(m => m.UsersCards),
        data: {
          title: 'Users Cards',
          breadcrumb: 'Users Cards',
        },
      },
    ],
  },
];
