import { Component } from '@angular/core';

import { switchSizeing } from '../../../../shared/data/forms-widgets/switch';

@Component({
  selector: 'app-switch-sizing',
  imports: [],
  templateUrl: './switch-sizing.html',
  styleUrl: './switch-sizing.scss',
})
export class SwitchSizing {
  public sizeingData = switchSizeing;
}
