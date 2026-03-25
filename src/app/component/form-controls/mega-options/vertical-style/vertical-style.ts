import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VerticalStylel } from '../../../../shared/data/form-controls/mega-options';

@Component({
  selector: 'app-vertical-style',
  imports: [FormsModule],
  templateUrl: './vertical-style.html',
  styleUrl: './vertical-style.scss',
})
export class VerticalStyle {
  public verticalstyleData = VerticalStylel;
}
