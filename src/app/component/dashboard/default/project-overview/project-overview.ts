import { Component } from '@angular/core';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-project-overview',
  imports: [ClickOutsideDirective, Feathericon],
  templateUrl: './project-overview.html',
  styleUrl: './project-overview.scss',
})
export class ProjectOverview {
  public isopen: boolean = false;
  public isopen2: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }
  open2() {
    this.isopen2 = !this.isopen2;
  }

  clickOutside(): void {
    this.isopen = false;
    this.isopen2 = false;
  }
}
