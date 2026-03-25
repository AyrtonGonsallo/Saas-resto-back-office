import { Component } from '@angular/core';

import { FullscreenLgModal } from './fullscreen-lg-modal/fullscreen-lg-modal';
import { FullscreenMdModal } from './fullscreen-md-modal/fullscreen-md-modal';
import { FullscreenSimpleModal } from './fullscreen-simple-modal/fullscreen-simple-modal';
import { FullscreenSmModal } from './fullscreen-sm-modal/fullscreen-sm-modal';
import { FullscreenXlModal } from './fullscreen-xl-modal/fullscreen-xl-modal';
import { FullscreenXxlModal } from './fullscreen-xxl-modal/fullscreen-xxl-modal';

@Component({
  selector: 'app-fullscreen-modal',
  imports: [
    FullscreenLgModal,
    FullscreenMdModal,
    FullscreenSimpleModal,
    FullscreenSmModal,
    FullscreenXlModal,
    FullscreenXxlModal,
  ],
  templateUrl: './fullscreen-modal.html',
  styleUrl: './fullscreen-modal.scss',
})
export class FullscreenModal {}
