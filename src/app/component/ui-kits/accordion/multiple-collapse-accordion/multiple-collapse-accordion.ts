import { Component } from '@angular/core';

@Component({
  selector: 'app-multiple-collapse-accordion',
  imports: [],
  templateUrl: './multiple-collapse-accordion.html',
  styleUrl: './multiple-collapse-accordion.scss',
})
export class MultipleCollapseAccordion {
  public togglecollpese = false;
  public togglecollpese2 = false;
  public togglecollpese3 = false;

  onClick() {
    this.togglecollpese = !this.togglecollpese;
  }

  open() {
    this.togglecollpese2 = !this.togglecollpese2;
  }

  toggle() {
    this.togglecollpese = !this.togglecollpese;
    this.togglecollpese2 = !this.togglecollpese2;
  }
}
