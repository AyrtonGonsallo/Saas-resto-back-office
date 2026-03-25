import { Component } from '@angular/core';

import { CommonBorderDisplay } from './common-border-display/common-border-display';
import * as borderData from '../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-border-displays',
  imports: [CommonBorderDisplay],
  templateUrl: './border-displays.html',
  styleUrl: './border-displays.scss',
})
export class BorderDisplays {
  public Additiveborder = borderData.AdditiveBorderData;
  public SubtractiveborderData = borderData.Subtractiveborder;
  public AdditiveRadiusData = borderData.AdditiveRadius;
}
