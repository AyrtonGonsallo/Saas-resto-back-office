import { Component } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { commonImg, Lazyload0ptions } from '../../../../shared/data/bonus-ui/owl-carousel';

@Component({
  selector: 'app-lazy-load-example',
  imports: [CarouselModule],
  templateUrl: './lazy-load-example.html',
  styleUrl: './lazy-load-example.scss',
})
export class LazyLoadExample {
  public lazyloadData = commonImg;
  public lazyLoadOptions = Lazyload0ptions;
}
