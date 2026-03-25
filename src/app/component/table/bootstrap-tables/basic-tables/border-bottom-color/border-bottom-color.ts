import { Component } from '@angular/core';

import { basictable } from '../../../../../shared/data/table/basic-tables';

@Component({
  selector: 'app-border-bottom-color',
  imports: [],
  templateUrl: './border-bottom-color.html',
  styleUrl: './border-bottom-color.scss',
})
export class BorderBottomColor {
  public basicTable = basictable;
}
