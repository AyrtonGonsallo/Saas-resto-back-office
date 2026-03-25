import { Component } from '@angular/core';

import { CustomValues } from './custom-values/custom-values';
import { DefaultRangeSlider } from './default-range-slider/default-range-slider';
import { Disabled } from './disabled/disabled';
import { MinMaxSlider } from './min-max-slider/min-max-slider';
import { PrettifyNumber } from './prettify-number/prettify-number';

@Component({
  selector: 'app-range-slider',
  imports: [CustomValues, DefaultRangeSlider, Disabled, MinMaxSlider, PrettifyNumber],
  templateUrl: './range-slider.html',
  styleUrl: './range-slider.scss',
})
export class RangeSlider {}
