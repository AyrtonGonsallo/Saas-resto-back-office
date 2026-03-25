import { ViewportScroller } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';

import { Feathericon } from '../feathericon/feathericon';

@Component({
  selector: 'app-tap-to-top',
  imports: [Feathericon],
  templateUrl: './tap-to-top.html',
  styleUrl: './tap-to-top.scss',
})
export class TapToTop {
  public show: boolean = false;

  private viewScroller = inject(ViewportScroller);

  // @HostListener Decorator
  @HostListener('window:scroll', [])
  onWindowScroll() {
    let number =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 600) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  tapToTop() {
    this.viewScroller.scrollToPosition([0, 0]);
  }
}
