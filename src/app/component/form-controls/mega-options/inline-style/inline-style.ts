import { Component } from '@angular/core';

import { inlineStyle } from '../../../../shared/data/form-controls/mega-options';

@Component({
  selector: 'app-inline-style',
  imports: [],
  templateUrl: './inline-style.html',
  styleUrl: './inline-style.scss',
})
export class InlineStyle {
  public inlineData = inlineStyle;
}
