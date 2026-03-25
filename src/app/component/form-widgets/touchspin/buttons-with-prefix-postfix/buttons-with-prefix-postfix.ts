import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons-with-prefix-postfix',
  imports: [],
  templateUrl: './buttons-with-prefix-postfix.html',
  styleUrl: './buttons-with-prefix-postfix.scss',
})
export class ButtonsWithPrefixPostfix {
  public counter: number[] = [0, 0];

  public increment(i: number) {
    if (i === 0 || i === 1) {
      this.counter[i] += 1;
    }
  }

  public decrement(i: number) {
    if (i === 0 || i === 1) {
      if (this.counter[i] > 0) {
        this.counter[i] -= 1;
      }
    }
  }
}
