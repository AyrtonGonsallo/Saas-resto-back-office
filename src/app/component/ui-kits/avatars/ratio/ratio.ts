import { Component } from '@angular/core';

import { Ratios } from '../../../../shared/data/ui-kits/avavtar';

@Component({
  selector: 'app-ratio',
  imports: [],
  templateUrl: './ratio.html',
  styleUrl: './ratio.scss',
})
export class Ratio {
  public ratioData = Ratios;
}
