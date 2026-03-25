import { Component } from '@angular/core';

import { Shape } from '../../../../shared/data/ui-kits/avavtar';

@Component({
  selector: 'app-shapes',
  imports: [],
  templateUrl: './shapes.html',
  styleUrl: './shapes.scss',
})
export class Shapes {
  public shapesData = Shape;
}
