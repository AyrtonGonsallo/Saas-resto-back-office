import { Routes } from '@angular/router';

export const FileManager: Routes = [
  {
    path: '',
    loadComponent: () => import('./file-manager').then(m => m.FileManagers),
  },
];
