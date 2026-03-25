import { Component } from '@angular/core';

import { BasicTooltip } from './basic-tooltip/basic-tooltip';
import { ColoredTooltip } from './colored-tooltip/colored-tooltip';
import { FilledTooltip } from './filled-tooltip/filled-tooltip';
import { HtmlElementsClickEvent } from './html-elements-click-event/html-elements-click-event';
import { ImageTooltip } from './image-tooltip/image-tooltip';
import { TooltipDirections } from './tooltip-directions/tooltip-directions';
import { WonkyTooltip } from './wonky-tooltip/wonky-tooltip';

@Component({
  selector: 'app-tooltip',
  imports: [
    BasicTooltip,
    ColoredTooltip,
    FilledTooltip,
    HtmlElementsClickEvent,
    ImageTooltip,
    TooltipDirections,
    WonkyTooltip,
  ],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip {}
