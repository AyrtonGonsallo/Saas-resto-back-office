import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { defaultswitch } from '../../../../shared/data/form-controls/checkbox-radio';

@Component({
  selector: 'app-default-switch',
  imports: [FormsModule],
  templateUrl: './default-switch.html',
  styleUrl: './default-switch.scss',
})
export class DefaultSwitch {
  public switches = defaultswitch;
}
