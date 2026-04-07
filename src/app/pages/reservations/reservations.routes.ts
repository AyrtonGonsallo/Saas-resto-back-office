import { Routes } from '@angular/router';

export const ReservationsRoutes : Routes = [
  {
    path: '',
    children: [
      
      
      {
        path: 'modifier-reservation/:id',
        loadComponent: () => import('./modifier-reservation/modifier-reservation').then(m => m.ModifierReservation),
        data: {
          title: 'Modifier une réservation',
          breadcrumb: 'Modifier une réservation',
          parentpath: 'reservations/liste-reservations'
        },
      },
      {
        path: 'liste-reservations',
        loadComponent: () => import('./reservations').then(m => m.Reservations),
        data: {
          title: 'Liste des réservations',
          breadcrumb: 'Liste des réservations',
        },
      },
      
      
    ],
  },
];
