import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-description-tab',
  imports: [NgClass],
  templateUrl: './description-tab.html',
  styleUrl: './description-tab.scss',
})
export class DescriptionTab {
  public openTab: string = 'febric';

  public tabbed(val: string) {
    this.openTab = val;
  }
}
