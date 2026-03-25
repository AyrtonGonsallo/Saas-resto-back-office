import { Component } from '@angular/core';

import { LightboxModule } from 'ng-gallery/lightbox';

import * as Data from '../../../shared/data/gallery/hover';

@Component({
  selector: 'app-hover-effect',
  imports: [LightboxModule],
  templateUrl: './hover-effect.html',
  styleUrl: './hover-effect.scss',
})
export class HoverEffect {
  public imgData = Data.imgData;
  public hoverData = Data.hoverData;
}
