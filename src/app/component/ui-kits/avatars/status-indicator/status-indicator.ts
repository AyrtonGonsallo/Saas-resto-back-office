import { Component } from '@angular/core';

import { StatusIndicators } from '../../../../shared/data/ui-kits/avavtar';

@Component({
  selector: 'app-status-indicator',
  imports: [],
  templateUrl: './status-indicator.html',
  styleUrl: './status-indicator.scss',
})
export class StatusIndicator {
  public statusindicatorData = StatusIndicators;
}
