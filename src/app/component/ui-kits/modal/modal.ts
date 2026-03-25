import { Component } from '@angular/core';

import { BasicModal } from './basic-modal/basic-modal';
import { CenteredModal } from './centered-modal/centered-modal';
import { CustomModals } from './custom-modals/custom-modals';
import { FullscreenModal } from './fullscreen-modal/fullscreen-modal';
import { SizesModal } from './sizes-modal/sizes-modal';
import { StaticBackdropModal } from './static-backdrop-modal/static-backdrop-modal';
import { ToggleBetweenModals } from './toggle-between-modals/toggle-between-modals';

@Component({
  selector: 'app-modal',
  imports: [
    BasicModal,
    CenteredModal,
    CustomModals,
    FullscreenModal,
    SizesModal,
    StaticBackdropModal,
    ToggleBetweenModals,
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {}
