import { Component } from '@angular/core';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import { allIcon } from '../../../shared/data/icons/thimify';

@Component({
  selector: 'app-feather-icon',
  imports: [Feathericon],
  templateUrl: './feather-icon.html',
  styleUrl: './feather-icon.scss',
})
export class FeatherIcon {
  public detail: boolean = false;
  public flag: string;
  public val: string;
  public icon: string;
  public allIconData = allIcon.feather;

  toggleWithInfo(icon: string) {
    this.detail = true;
    this.icon = icon;
    this.val = '<app-feather-icon [icon]="' + icon + '"></app-feather-icon>';
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = '<app-feather-icon [icon]="' + val + '"></app-feather-icon>>';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
