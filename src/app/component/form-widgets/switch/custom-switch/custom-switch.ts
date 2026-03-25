import { Component } from '@angular/core';

import { customSwitch } from '../../../../shared/data/forms-widgets/switch';

@Component({
  selector: 'app-custom-switch',
  imports: [],
  templateUrl: './custom-switch.html',
  styleUrl: './custom-switch.scss',
})
export class CustomSwitch {
  public customData = customSwitch;
}
