import { NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutService } from '../../../../shared/services/layout.service';
import { NavmenuService } from '../../../services/navmenu.service';
import { Breadcrumb } from '../../breadcrumb/breadcrumb';
import { Customizer } from '../../customizer/customizer';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import { Sidebar } from '../../sidebar/sidebar';

@Component({
  selector: 'app-content',
  imports: [Header, Sidebar, Breadcrumb, Customizer, RouterOutlet, Footer, NgClass],
  templateUrl: './content.html',
  styleUrl: './content.scss',
})
export class Content {
  public navmenu = inject(NavmenuService);
  public layout: LayoutService = inject(LayoutService);

  constructor() {
    if (window.innerWidth < 1185) {
      this.navmenu.closeSidebar = true;
    }

    if (window.innerWidth <= 1185) {
      this.layout.config.settings.sidebar_type = 'compact-wrapper';
    } else {
      this.layout.config.settings.sidebar_type = this.layout.config.settings.sidebar_type;
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 1185) {
      this.navmenu.closeSidebar = true;
    } else {
      this.navmenu.closeSidebar = false;
    }

    if (window.innerWidth <= 1185) {
      this.layout.config.settings.sidebar_type = 'compact-wrapper';
    } else {
      this.layout.config.settings.sidebar_type = this.layout.config.settings.sidebar_type;
    }
  }
}
