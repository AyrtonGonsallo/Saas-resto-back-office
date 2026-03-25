import { Component } from '@angular/core';

import { BasicPopover } from './basic-popover/basic-popover';
import { PopoverDirection } from './popover-direction/popover-direction';
import { PopoverOffset } from './popover-offset/popover-offset';

@Component({
  selector: 'app-popover',
  imports: [PopoverDirection, BasicPopover, PopoverOffset],
  templateUrl: './popover.html',
  styleUrl: './popover.scss',
})
export class Popover {}
