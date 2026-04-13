import { Routes } from '@angular/router';

export const NotificationsRoutes : Routes = [
  {
    path: '',
    children: [
      
      
      {
        path: 'voir-notification/:id',
        loadComponent: () => import('./voir-notification/voir-notification').then(m => m.VoirNotification),
        data: {
          title: 'Voir une notification',
          breadcrumb: 'Voir une notification',
          parentpath: 'notifications/liste-notifications'
        },
      },
      {
        path: 'liste-notifications',
        loadComponent: () => import('./notifications').then(m => m.Notifications),
        data: {
          title: 'Liste des notifications',
          breadcrumb: 'Liste des notifications',
        },
      },
      
      
    ],
  },
];
