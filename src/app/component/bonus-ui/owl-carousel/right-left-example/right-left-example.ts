import { Component } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { commonImg, RightToLeftoptions } from '../../../../shared/data/bonus-ui/owl-carousel';

@Component({
  selector: 'app-right-left-example',
  imports: [CarouselModule],
  templateUrl: './right-left-example.html',
  styleUrl: './right-left-example.scss',
})
export class RightLeftExample {
  public rightLeftData = commonImg;
  public rightleftoptions = RightToLeftoptions;
}
