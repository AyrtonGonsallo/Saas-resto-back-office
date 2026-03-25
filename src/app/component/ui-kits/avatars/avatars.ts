import { Component } from '@angular/core';

import { Grouping } from './grouping/grouping';
import { GroupingWithCounter } from './grouping-with-counter/grouping-with-counter';
import { Ratio } from './ratio/ratio';
import { Shapes } from './shapes/shapes';
import { Sizes } from './sizes/sizes';
import { StatusIndicator } from './status-indicator/status-indicator';

@Component({
  selector: 'app-avatars',
  imports: [Grouping, GroupingWithCounter, Ratio, Shapes, Sizes, StatusIndicator],
  templateUrl: './avatars.html',
  styleUrl: './avatars.scss',
})
export class Avatars {}
