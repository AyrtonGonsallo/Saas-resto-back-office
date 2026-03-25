import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

import * as data from '../../../shared/data/buttons/buttons';
import { CommonButtons } from '../common-buttons/common-buttons';

@Component({
  selector: 'app-buttons-style',
  imports: [CommonButtons, NgClass],
  templateUrl: './buttons-style.html',
  styleUrl: './buttons-style.scss',
})
export class ButtonsStyle {
  public openTab: string = 'Default';
  public Buttonsdefult = data.buttonDefaultStyle;
  public Buttonfalt = data.ButtonFaltstyle;
  public ButtonEdge = data.buttonEdgeStyle;
  public ButtonRaised = data.buttonRaisedStyle;
  public ButtonOutline = data.buttonOutlineStyle;
  public Buttongradient = data.buttonGradientStyle;

  public tabbed(val: string) {
    this.openTab = val;
  }
}
