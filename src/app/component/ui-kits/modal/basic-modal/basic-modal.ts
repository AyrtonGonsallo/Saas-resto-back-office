import { Component } from '@angular/core';

import { OpenModalEdmin } from './open-modal-edmin/open-modal-edmin';
import { ScrollingContent } from './scrolling-content/scrolling-content';
import { Simple } from './simple/simple';
import { TooltipsPopovers } from './tooltips-popovers/tooltips-popovers';

@Component({
  selector: 'app-basic-modal',
  imports: [OpenModalEdmin, ScrollingContent, Simple, TooltipsPopovers],
  templateUrl: './basic-modal.html',
  styleUrl: './basic-modal.scss',
})
export class BasicModal {}
