import { Routes } from '@angular/router';

export const formContols: Routes = [
  {
    path: '',
    children: [
      {
        path: 'base-input',
        loadComponent: () => import('./base-input/base-input').then(m => m.BaseInput),
        data: {
          title: 'Base Inputs',
          breadcrumb: 'Base Inputs',
        },
      },
      {
        path: 'checkbox-radio',
        loadComponent: () => import('./checkbox-radio/checkbox-radio').then(m => m.CheckboxRadio),
        data: {
          title: 'Checkbox & Radio',
          breadcrumb: 'Checkbox-Radio',
        },
      },
      {
        path: 'input-groups',
        loadComponent: () => import('./input-group/input-group').then(m => m.InputGroup),
        data: {
          title: 'Input Groups',
          breadcrumb: 'Input Groups',
        },
      },
      {
        path: 'mega-options',
        loadComponent: () => import('./mega-options/mega-options').then(m => m.MegaOptions),
        data: {
          title: 'Mega Options',
          breadcrumb: 'Mega Options',
        },
      },
      {
        path: 'validation',
        loadComponent: () =>
          import('./forms-validation/forms-validation').then(m => m.FormsValidation),
        data: {
          title: 'Validation Form',
          breadcrumb: 'Validation Form',
        },
      },
    ],
  },
];
