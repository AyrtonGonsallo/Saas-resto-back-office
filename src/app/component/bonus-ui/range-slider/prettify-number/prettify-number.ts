import { Component } from '@angular/core';

import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-prettify-number',
  imports: [NgxSliderModule],
  templateUrl: './prettify-number.html',
  styleUrl: './prettify-number.scss',
})
export class PrettifyNumber {
  public value3: number = 2000;

  public options3: Options = {
    floor: 1000,
    ceil: 10000,
    showTicksValues: true,
    tickStep: 3000,
    tickValueStep: 100,
  };
}
