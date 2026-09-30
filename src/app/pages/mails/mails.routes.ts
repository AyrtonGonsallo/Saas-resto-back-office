import { Routes } from '@angular/router';

export const MailsRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'creer-template-mail',
        loadComponent: () => import('./ajouter-mail/ajouter-mail').then(m => m.AjouterMail),
        data: {
          title: 'Créer un template-mail',
          breadcrumb: 'Créer un template-mail',
          parentpath: 'template-mails/liste-template-mails'
        },
      },
      {
        path: 'modifier-template-mail/:id',
        loadComponent: () => import('./modifier-mail/modifier-mail').then(m => m.ModifierMail),
        data: {
          title: 'Modifier un template-mail',
          breadcrumb: 'Modifier un template-mail',
          parentpath: 'template-mails/liste-template-mails'
        },
      },
      {
        path: 'liste-template-mails',
        loadComponent: () => import('./mails').then(m => m.Mails),
        data: {
          title: 'Liste des templates mails',
          breadcrumb: 'Liste des templates mails',
        },
      },
      
      
    ],
  },
];
