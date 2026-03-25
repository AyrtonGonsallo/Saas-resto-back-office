import { Component } from '@angular/core';

import { TimelineCenter } from './timeline-center/timeline-center';
import { TimelineLeft } from './timeline-left/timeline-left';
import { TimelineRight } from './timeline-right/timeline-right';

@Component({
  selector: 'app-timeline',
  imports: [TimelineCenter, TimelineRight, TimelineLeft],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {}
