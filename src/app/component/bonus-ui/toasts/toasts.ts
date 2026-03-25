import { Component } from '@angular/core';

import { ColorSchemes } from './color-schemes/color-schemes';
import { DefaultToast } from './default-toast/default-toast';
import { LiveToast } from './live-toast/live-toast';
import { StackingToast } from './stacking-toast/stacking-toast';
import { TranslucentToast } from './translucent-toast/translucent-toast';
import { UniqueToast } from './unique-toast/unique-toast';

@Component({
  selector: 'app-toasts',
  imports: [ColorSchemes, DefaultToast, LiveToast, StackingToast, TranslucentToast, UniqueToast],
  templateUrl: './toasts.html',
  styleUrl: './toasts.scss',
})
export class Toasts {}
