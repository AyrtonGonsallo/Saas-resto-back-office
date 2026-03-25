import { Component } from '@angular/core';

import { CustomProgressbars } from '../../../../shared/data/ui-kits/progress';

@Component({
  selector: 'app-custom-progress-bars',
  templateUrl: './custom-progress-bars.html',
  styleUrl: './custom-progress-bars.scss',
})
export class CustomProgressBars {
  public customprogressData = CustomProgressbars;
}
