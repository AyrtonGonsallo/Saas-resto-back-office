import { Component } from '@angular/core';

import { variationTimeline } from '../../../../shared/data/bonus-ui/timeline';

@Component({
  selector: 'app-variation-timeline',
  imports: [],
  templateUrl: './variation-timeline.html',
  styleUrl: './variation-timeline.scss',
})
export class VariationTimeline {
  public variationTimelineData = variationTimeline;
}
