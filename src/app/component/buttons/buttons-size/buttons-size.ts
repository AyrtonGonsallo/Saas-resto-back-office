import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

import * as data from '../../../shared/data/buttons/buttons';

@Component({
  selector: 'app-buttons-size',
  imports: [NgClass],
  templateUrl: './buttons-size.html',
  styleUrl: './buttons-size.scss',
})
export class ButtonsSize {
  public openTab: string = 'Default';
  public ButtonData = data.buttonSizeData;

  public tabbed(val: string) {
    this.openTab = val;
  }
}
