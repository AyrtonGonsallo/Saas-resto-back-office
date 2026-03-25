import { Component } from '@angular/core';

import { CommonProgressBar } from './common-progress-bar/common-progress-bar';
import { CustomHeightProgressBars } from './custom-height-progress-bars/custom-height-progress-bars';
import { CustomProgressBars } from './custom-progress-bars/custom-progress-bars';
import { LargeProgressBars } from './large-progress-bars/large-progress-bars';
import { MultipleBars } from './multiple-bars/multiple-bars';
import { ProgressNumberSteps } from './progress-number-steps/progress-number-steps';
import { SmallProgressBars } from './small-progress-bars/small-progress-bars';
import * as data from '../../../shared/data/ui-kits/progress';

@Component({
  selector: 'app-progress',
  imports: [
    CommonProgressBar,
    CustomHeightProgressBars,
    CustomProgressBars,
    LargeProgressBars,
    MultipleBars,
    ProgressNumberSteps,
    SmallProgressBars,
  ],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
})
export class Progress {
  public basicData = data.basicProgress;
  public progressStripedData = data.ProgressBarsStriped;
  public progressAnimatedData = data.ProgressBarsAnimated;
}
