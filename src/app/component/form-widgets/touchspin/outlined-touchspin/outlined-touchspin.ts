import { Component } from '@angular/core';

import { outlinedtouchspin } from '../../../../shared/data/forms-widgets/touchspin';

@Component({
  selector: 'app-outlined-touchspin',
  imports: [],
  templateUrl: './outlined-touchspin.html',
  styleUrl: './outlined-touchspin.scss',
})
export class OutlinedTouchspin {
  public OutlinedData = outlinedtouchspin;

  decrement(i: number) {
    if (this.OutlinedData[i].value > 0) {
      this.OutlinedData[i].value -= 1;
    }
  }
  increment(i: number) {
    this.OutlinedData[i].value += 1;
  }
}
