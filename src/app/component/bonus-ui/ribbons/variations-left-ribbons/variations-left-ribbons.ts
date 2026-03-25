import { Component } from '@angular/core';

import { LeftRibbons } from '../../../../shared/data/bonus-ui/ribbons';

@Component({
  selector: 'app-variations-left-ribbons',
  imports: [],
  templateUrl: './variations-left-ribbons.html',
  styleUrl: './variations-left-ribbons.scss',
})
export class VariationsLeftRibbons {
  public leftRibbonsData = LeftRibbons;
}
