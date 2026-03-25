import { Component } from '@angular/core';

import { FontSizes } from '../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-font-size',
  imports: [],
  templateUrl: './font-size.html',
  styleUrl: './font-size.scss',
})
export class FontSize {
  public fonstSizeData = FontSizes;
}
