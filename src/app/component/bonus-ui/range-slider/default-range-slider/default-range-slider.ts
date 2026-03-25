import { Component } from '@angular/core';

import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-default-range-slider',
  imports: [NgxSliderModule],
  templateUrl: './default-range-slider.html',
  styleUrl: './default-range-slider.scss',
})
export class DefaultRangeSlider {
  public value: number = 550;

  public options: Options = {
    floor: 100,
    ceil: 1000,
  };
}
