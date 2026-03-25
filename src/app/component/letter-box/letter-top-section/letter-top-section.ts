import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';

@Component({
  selector: 'app-letter-top-section',
  imports: [NgbModule, ClickOutsideDirective, Feathericon],
  templateUrl: './letter-top-section.html',
  styleUrl: './letter-top-section.scss',
})
export class LetterTopSection {
  public active = 1;
  public isOpen: boolean = false;

  openMenu() {
    this.isOpen = !this.isOpen;
  }

  clickOutside(): void {
    this.isOpen = false;
  }
}
