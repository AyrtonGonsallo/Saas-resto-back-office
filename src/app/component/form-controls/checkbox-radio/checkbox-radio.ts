import { Component } from '@angular/core';

import { AnimatedButtons } from './animated-buttons/animated-buttons';
import { BasicRadioCheckbox } from './basic-radio-checkbox/basic-radio-checkbox';
import { CustomCheckbox } from './custom-checkbox/custom-checkbox';
import { CustomRadio } from './custom-radio/custom-radio';
import { DefaultCheckbox } from './default-checkbox/default-checkbox';
import { DefaultRadio } from './default-radio/default-radio';
import { DefaultSwitch } from './default-switch/default-switch';
import { ImagesCheckbox } from './images-checkbox/images-checkbox';
import { ImagesRadio } from './images-radio/images-radio';
import { InlineInputType } from './inline-input-type/inline-input-type';
import { OutlinedCheckboxStyle } from './outlined-checkbox-style/outlined-checkbox-style';
import { RadioToggleButtons } from './radio-toggle-buttons/radio-toggle-buttons';

@Component({
  selector: 'app-checkbox-radio',
  imports: [
    AnimatedButtons,
    BasicRadioCheckbox,
    CustomCheckbox,
    CustomRadio,
    DefaultCheckbox,
    DefaultRadio,
    DefaultSwitch,
    ImagesCheckbox,
    InlineInputType,
    OutlinedCheckboxStyle,
    RadioToggleButtons,
    ImagesRadio,
  ],
  templateUrl: './checkbox-radio.html',
  styleUrl: './checkbox-radio.scss',
})
export class CheckboxRadio {}
