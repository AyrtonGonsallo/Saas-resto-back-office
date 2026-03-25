import { Component } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { center, owlcarousel1ptions } from '../../../../shared/data/bonus-ui/owl-carousel';

@Component({
  selector: 'app-center-example',
  imports: [CarouselModule],
  templateUrl: './center-example.html',
  styleUrl: './center-example.scss',
})
export class CenterExample {
  public centerData = center;
  public centeroptions = owlcarousel1ptions;
}
