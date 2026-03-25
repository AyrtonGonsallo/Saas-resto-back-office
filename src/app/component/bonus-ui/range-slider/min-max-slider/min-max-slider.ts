import { Component } from '@angular/core';

import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-min-max-slider',
  imports: [NgxSliderModule],
  templateUrl: './min-max-slider.html',
  styleUrl: './min-max-slider.scss',
})
export class MinMaxSlider {
  public value2: number = 550;
  public maxvalue: number = 100;

  public options: Options = {
    floor: 100,
    ceil: 1000,
  };
}
