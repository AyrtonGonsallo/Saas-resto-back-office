import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-live-alert',
  imports: [NgClass],
  templateUrl: './live-alert.html',
  styleUrl: './live-alert.scss',
})
export class LiveAlert {
  public showLog = false;
  public counter: number = 0;
  public array: number[] = [];
  public alerts2: boolean = true;

  onShowLog() {
    this.showLog = true;
    this.counter++;
    this.array.push(this.counter);
  }

  close(Data: number) {
    this.array.splice(this.array.indexOf(Data), 1);
  }

  close2() {
    this.alerts2 = false;
  }
}
