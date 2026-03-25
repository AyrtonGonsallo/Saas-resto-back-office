import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ColorPicker } from './color-picker/color-picker';
import { LayoutType } from './layout-type/layout-type';
import { SidebarIcon } from './sidebar-icon/sidebar-icon';
import { SidebarType } from './sidebar-type/sidebar-type';
import { ThemeMode } from './theme-mode/theme-mode';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-customizer',
  imports: [ColorPicker, LayoutType, SidebarIcon, SidebarType, ThemeMode],
  templateUrl: './customizer.html',
  styleUrl: './customizer.scss',
})
export class Customizer {
  private modalService = inject(NgbModal);
  public layoutService = inject(LayoutService);

  openModal(popup: TemplateRef<NgbModal>) {
    this.modalService.open(popup, { backdropClass: 'dark-modal', centered: true });
  }

  Customizer(val: string) {
    this.layoutService.customizer = val;
  }

  copyText(data: object) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(data);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
