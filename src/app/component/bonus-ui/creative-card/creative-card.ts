import { Component } from '@angular/core';

import { BorderPrimaryState } from './border-primary-state/border-primary-state';
import { BorderSuccessState } from './border-success-state/border-success-state';
import { BorderWarningState } from './border-warning-state/border-warning-state';
import { CommonBorderCard } from './common-border-card/common-border-card';
import { CommonBottomCard } from './common-bottom-card/common-bottom-card';

@Component({
  selector: 'app-creative-card',
  imports: [
    BorderPrimaryState,
    BorderSuccessState,
    BorderWarningState,
    CommonBorderCard,
    CommonBottomCard,
  ],
  templateUrl: './creative-card.html',
  styleUrl: './creative-card.scss',
})
export class CreativeCard {}
