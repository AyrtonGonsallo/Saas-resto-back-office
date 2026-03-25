import { Component } from '@angular/core';

import { ExtraLargeModal } from './extra-large-modal/extra-large-modal';
import { LargeModal } from './large-modal/large-modal';
import { SmallModal } from './small-modal/small-modal';
import { FullScreenModal } from '../sizes-modal/full-screen-modal/full-screen-modal';

@Component({
  selector: 'app-sizes-modal',
  imports: [SmallModal, LargeModal, ExtraLargeModal, FullScreenModal],
  templateUrl: './sizes-modal.html',
  styleUrl: './sizes-modal.scss',
})
export class SizesModal {}
