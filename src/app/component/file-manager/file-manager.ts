import { Component } from '@angular/core';

import { FileItem } from './file-item/file-item';
import { FileManagerSidebar } from './file-manager-sidebar/file-manager-sidebar';

@Component({
  selector: 'app-file-manager',
  imports: [FileItem, FileManagerSidebar],
  templateUrl: './file-manager.html',
  styleUrl: './file-manager.scss',
})
export class FileManagers {}
