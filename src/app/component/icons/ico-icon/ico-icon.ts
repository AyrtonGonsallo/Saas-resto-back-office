import { Component } from '@angular/core';

import { allIcon } from '../../../shared/data/icons/thimify';

@Component({
  selector: 'app-ico-icon',
  imports: [],
  templateUrl: './ico-icon.html',
  styleUrl: './ico-icon.scss',
})
export class IcoIcon {
  public detail: boolean = false;
  public icon: string;
  public val: string;
  public allIconData = allIcon.ico;

  toggleWithInfo(icon: string) {
    this.detail = true;
    this.icon = icon;
    this.val = '<i class="icofont icofont-' + icon + '"></i>';
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = '<i class="icofont icofont-' + val + '"></i>';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
