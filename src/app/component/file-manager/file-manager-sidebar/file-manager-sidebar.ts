import { Component } from '@angular/core';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';

@Component({
  selector: 'app-file-manager-sidebar',
  imports: [Feathericon, ClickOutsideDirective],
  templateUrl: './file-manager-sidebar.html',
  styleUrl: './file-manager-sidebar.scss',
})
export class FileManagerSidebar {
  public open: boolean = false;

  openFilter() {
    this.open = !this.open;
  }

  clickOutside(): void {
    this.open = false;
  }
}
