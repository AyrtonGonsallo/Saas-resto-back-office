import { Component } from '@angular/core';

import { horizontalTimeline } from '../../../../shared/data/bonus-ui/timeline';

@Component({
  selector: 'app-horizontal-timeline',
  imports: [],
  templateUrl: './horizontal-timeline.html',
  styleUrl: './horizontal-timeline.scss',
})
export class HorizontalTimeline {
  public horizontalTimelineData = horizontalTimeline;
}
