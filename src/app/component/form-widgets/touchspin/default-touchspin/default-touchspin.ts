import { Component } from '@angular/core';

import { Touchspin } from '../../../../shared/data/forms-widgets/touchspin';

@Component({
  selector: 'app-default-touchspin',
  imports: [],
  templateUrl: './default-touchspin.html',
  styleUrl: './default-touchspin.scss',
})
export class DefaultTouchspin {
  public TouchspinData = Touchspin;

  decrement(i: number) {
    if (this.TouchspinData[i].value > 0) {
      this.TouchspinData[i].value -= 1;
    }
  }
  increment(i: number) {
    this.TouchspinData[i].value += 1;
  }
}
