import { Component, inject } from '@angular/core';

import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.html',
  styleUrl: './theme.scss',
})
export class Theme {
  private layout = inject(LayoutService);
  public dark: boolean = this.layout.config.settings.layout_version == 'dark' ? true : false;

  layoutToggle() {
    this.dark = !this.dark;
    if (this.dark == true) {
      document.body.classList.add('dark');
      document.getElementsByTagName('html')[0].setAttribute('data-theme', 'dark');
    } else {
      document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light');
      document.body.classList.add('light');
    }
  }
}
