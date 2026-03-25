import { Component } from '@angular/core';

import { customheightprogress } from '../../../../shared/data/ui-kits/progress';

@Component({
  selector: 'app-custom-height-progress-bars',
  templateUrl: './custom-height-progress-bars.html',
  styleUrl: './custom-height-progress-bars.scss',
})
export class CustomHeightProgressBars {
  public customheightData = customheightprogress;
}
