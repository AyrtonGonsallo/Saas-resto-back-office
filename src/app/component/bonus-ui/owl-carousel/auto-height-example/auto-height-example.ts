import { Component } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { commonImg, autoheigthoptions } from '../../../../shared/data/bonus-ui/owl-carousel';

@Component({
  selector: 'app-auto-height-example',
  imports: [CarouselModule],
  templateUrl: './auto-height-example.html',
  styleUrl: './auto-height-example.scss',
})
export class AutoHeightExample {
  public heigthData = commonImg;
  public heigthOptionData = autoheigthoptions;
}
