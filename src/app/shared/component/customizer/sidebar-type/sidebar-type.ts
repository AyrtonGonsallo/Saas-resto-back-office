import { Component, inject } from '@angular/core';

import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-sidebar-type',
  templateUrl: './sidebar-type.html',
  styleUrl: './sidebar-type.scss',
})
export class SidebarType {
  public sidebarType: string = 'compact-wrapper';
  public screenwidth = window.innerWidth;
  public layoutService = inject(LayoutService);

  customizeSidebarType(val: string) {
    if (this.screenwidth <= 1185) {
      if (val == 'horizontal-sidebar') {
        this.layoutService.config.settings.sidebar_type = 'compact-wrapper';
      }
    } else {
      this.sidebarType = val;
      this.layoutService.config.settings.sidebar_type = val;
      this.layoutService.customizer = '';
    }
  }
}
