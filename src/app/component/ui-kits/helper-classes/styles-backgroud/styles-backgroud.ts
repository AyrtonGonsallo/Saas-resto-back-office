import { Component } from '@angular/core';

import { CommonStylesBackground } from './common-styles-background/common-styles-background';
import * as borderData from '../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-styles-backgroud',
  imports: [CommonStylesBackground],
  templateUrl: './styles-backgroud.html',
  styleUrl: './styles-backgroud.scss',
})
export class StylesBackgroud {
  public DarkBackgrounData = borderData.DarkBackground;
  public LightBackgroundsData = borderData.Lightbackgrounds;
}
