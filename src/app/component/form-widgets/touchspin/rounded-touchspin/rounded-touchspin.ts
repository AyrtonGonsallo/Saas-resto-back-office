import { Component } from '@angular/core';

import { roundedtouchspin } from '../../../../shared/data/forms-widgets/touchspin';

@Component({
  selector: 'app-rounded-touchspin',
  imports: [],
  templateUrl: './rounded-touchspin.html',
  styleUrl: './rounded-touchspin.scss',
})
export class RoundedTouchspin {
  public roundedData = roundedtouchspin;

  decrement(i: number) {
    if (this.roundedData[i].value > 0) {
      this.roundedData[i].value -= 1;
    }
  }
  increment(i: number) {
    this.roundedData[i].value += 1;
  }
}
