import { Component } from '@angular/core';

import { VariationsLeftRibbons } from './variations-left-ribbons/variations-left-ribbons';
import { VariationsRightRibbons } from './variations-right-ribbons/variations-right-ribbons';

@Component({
  selector: 'app-ribbons',
  imports: [VariationsLeftRibbons, VariationsRightRibbons],
  templateUrl: './ribbons.html',
  styleUrl: './ribbons.scss',
})
export class Ribbons {}
