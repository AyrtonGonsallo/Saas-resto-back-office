import { Component } from '@angular/core';

import { AdditionalContent } from './additional-content/additional-content';
import { BorderDirectionAlert } from './border-direction-alert/border-direction-alert';
import { ColorAlertOutline } from './color-alert-outline/color-alert-outline';
import { CommonTopAlerts } from './common-top-alerts/common-top-alerts';
import { IconsTextAlerts } from './icons-text-alerts/icons-text-alerts';
import { LiveAlert } from './live-alert/live-alert';
import * as Data from '../../../shared/data/ui-kits/alert';

@Component({
  selector: 'app-alert',
  imports: [
    AdditionalContent,
    BorderDirectionAlert,
    ColorAlertOutline,
    CommonTopAlerts,
    IconsTextAlerts,
    LiveAlert,
  ],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  public darkAlert = Data.darkThemAlert;
  public LightAlert = Data.lightThemeAlert;
}
