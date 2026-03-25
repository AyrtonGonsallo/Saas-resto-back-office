import { Component, inject } from '@angular/core';

import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-layout-type',
  templateUrl: './layout-type.html',
  styleUrl: './layout-type.scss',
})
export class LayoutType {
  public layoutType: string = 'ltr';

  public layoutService = inject(LayoutService);

  customizeLayoutType(val: string) {
    this.layoutType = val;
    this.layoutService.config.settings.layout_type = val;
    if (val == 'rtl') {
      document.getElementsByTagName('html')[0].setAttribute('dir', val);
      document.body?.classList.add('rtl');
      document.body?.classList.remove('box-layout');
    } else if (val == 'box-layout') {
      document.getElementsByTagName('html')[0].setAttribute('dir', val);
      document.body?.classList.add('box-layout');
    } else {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
      document.body?.classList.add('ltr');
      document.body?.classList.remove('box-layout');
    }
  }
}
