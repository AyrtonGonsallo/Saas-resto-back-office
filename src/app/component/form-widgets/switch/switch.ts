import { Component } from '@angular/core';

import { CommonSwitch } from './common-switch/common-switch';
import { CustomSwitch } from './custom-switch/custom-switch';
import { DisabledOutlineSwitch } from './disabled-outline-switch/disabled-outline-switch';
import { SwitchSizing } from './switch-sizing/switch-sizing';
import { SwitchWithIcons } from './switch-with-icons/switch-with-icons';
import { VariationOutlineSwitch } from './variation-outline-switch/variation-outline-switch';

@Component({
  selector: 'app-switch',
  imports: [
    CommonSwitch,
    DisabledOutlineSwitch,
    CustomSwitch,
    SwitchSizing,
    SwitchWithIcons,
    VariationOutlineSwitch,
  ],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
})
export class Switch {}
