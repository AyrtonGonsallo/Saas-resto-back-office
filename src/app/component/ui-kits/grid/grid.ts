import { Component } from '@angular/core';

import { GridColumn } from './grid-column/grid-column';
import { GridOption } from './grid-option/grid-option';
import { HorizontalAlignment } from './horizontal-alignment/horizontal-alignment';
import { Nesting } from './nesting/nesting';
import { Offset } from './offset/offset';
import { Order } from './order/order';
import { VerticalAlignment } from './vertical-alignment/vertical-alignment';

@Component({
  selector: 'app-grid',
  imports: [GridColumn, GridOption, HorizontalAlignment, Nesting, Offset, Order, VerticalAlignment],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class Grid {}
