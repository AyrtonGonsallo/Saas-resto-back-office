import { Component } from '@angular/core';

import { Disabledoutlineswitch } from '../../../../shared/data/forms-widgets/switch';

@Component({
  selector: 'app-disabled-outline-switch',
  imports: [],
  templateUrl: './disabled-outline-switch.html',
  styleUrl: './disabled-outline-switch.scss',
})
export class DisabledOutlineSwitch {
  public disableoutline = Disabledoutlineswitch;
}
