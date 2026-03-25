import { Routes } from '@angular/router';

export const AuthenticationPages: Routes = [
  {
    path: '',
    children: [
      {
        path: 'simple',
        loadComponent: () => import('./simple-login/simple-login').then(m => m.SimpleLogin),
      },
      {
        path: 'image-one',
        loadComponent: () => import('./login-bg-img/login-bg-img').then(m => m.LoginBgImg),
      },
      {
        path: 'image-two',
        loadComponent: () => import('./login-img-two/login-img-two').then(m => m.LoginImgTwo),
      },
      {
        path: 'validation',
        loadComponent: () =>
          import('./login-vaildation/login-vaildation').then(m => m.LoginVaildation),
      },
      {
        path: 'tooltip',
        loadComponent: () => import('./login-tooltip/login-tooltip').then(m => m.LoginTooltip),
      },
      {
        path: 'sweetalert',
        loadComponent: () =>
          import('./login-sweetalert/login-sweetalert').then(m => m.LoginSweetalert),
      },
      {
        path: 'register-simple',
        loadComponent: () =>
          import('./register-simple/register-simple').then(m => m.RegisterSimple),
      },
      {
        path: 'register-image-one',
        loadComponent: () =>
          import('./register-bg-image/register-bg-image').then(m => m.RegisterBgImage),
      },
      {
        path: 'register-image-two',
        loadComponent: () =>
          import('./register-two-image/register-two-image').then(m => m.RegisterTwoImage),
      },
      {
        path: 'unlock-user',
        loadComponent: () => import('./unloack-user/unloack-user').then(m => m.UnloackUser),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./forget-password/forget-password').then(m => m.ForgetPassword),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password').then(m => m.ResetPassword),
      },
      {
        path: 'maintenance',
        loadComponent: () => import('./maintenance/maintenance').then(m => m.Maintenance),
      },
    ],
  },
];
