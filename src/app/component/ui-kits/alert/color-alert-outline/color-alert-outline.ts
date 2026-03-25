import { Component } from '@angular/core';

import * as data from '../../../../shared/data/ui-kits/alert';

@Component({
  selector: 'app-color-alert-outline',
  imports: [],
  templateUrl: './color-alert-outline.html',
  styleUrl: './color-alert-outline.scss',
})
export class ColorAlertOutline {
  public outlinealertData = data.OutlineDarkAlert;

  close(outlineitem: data.Alert) {
    this.outlinealertData.splice(this.outlinealertData.indexOf(outlineitem), 1);
  }
}
