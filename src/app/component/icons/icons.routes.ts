import { Routes } from '@angular/router';

export const Icons: Routes = [
  {
    path: '',
    children: [
      {
        path: 'flag-icons',
        loadComponent: () => import('./flag-icon/flag-icon').then(m => m.FlagIcon),
        data: {
          title: 'Flag Icon',
          breadcrumb: 'Flag Icon',
        },
      },
      {
        path: 'fontawesome-icons',
        loadComponent: () => import('./font-awesome/font-awesome').then(m => m.FontAwesome),
        data: {
          title: 'Font Awesome Icon',
          breadcrumb: 'Font Awesome Icon',
        },
      },
      {
        path: 'feather-icons',
        loadComponent: () => import('./feather-icon/feather-icon').then(m => m.FeatherIcon),
        data: {
          title: 'Feather Icon',
          breadcrumb: 'Feather Icon',
        },
      },
      {
        path: 'ico-icons',
        loadComponent: () => import('./ico-icon/ico-icon').then(m => m.IcoIcon),
        data: {
          title: 'ICO Icon',
          breadcrumb: 'ICO Icon',
        },
      },
      {
        path: 'themify-icons',
        loadComponent: () => import('./themify-icon/themify-icon').then(m => m.ThemifyIcon),
        data: {
          title: 'Themify Icon',
          breadcrumb: 'Themify Icon',
        },
      },
      {
        path: 'weather-icons',
        loadComponent: () => import('./weather-icon/weather-icon').then(m => m.WeatherIcon),
        data: {
          title: 'Weather Icon',
          breadcrumb: 'Weather Icon',
        },
      },
    ],
  },
];
