import { Component } from '@angular/core';

import * as data from '../../../../shared/data/ui-kits/alert';

@Component({
  selector: 'app-border-direction-alert',
  imports: [],
  templateUrl: './border-direction-alert.html',
  styleUrl: './border-direction-alert.scss',
})
export class BorderDirectionAlert {
  public DircationData = data.DirectionAlert;

  close(Dircationitem: data.Alert) {
    this.DircationData.splice(this.DircationData.indexOf(Dircationitem), 1);
  }
}
