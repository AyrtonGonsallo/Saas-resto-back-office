import { Component, inject } from '@angular/core';

import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-theme-mode',
  templateUrl: './theme-mode.html',
  styleUrl: './theme-mode.scss',
})
export class ThemeMode {
  public MIXLayout: string = 'default';

  public layoutService = inject(LayoutService);

  customizeMixLayout(val: string) {
    this.MIXLayout = val;
    this.layoutService.config.settings.layout_version = val;
    document.body?.classList.remove('light', 'dark-sidebar', 'dark');
    if (val === 'default') {
      document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light');
      document.body?.classList.add('light');
    } else if (val === 'dark-sidebar') {
      document.getElementsByTagName('html')[0].setAttribute('data-theme', 'dark-sidebar');
      document.body?.classList.add('dark-sidebar');
    } else {
      document.getElementsByTagName('html')[0].setAttribute('data-theme', 'dark');
      document.body?.classList.add('dark');
    }
  }
}
