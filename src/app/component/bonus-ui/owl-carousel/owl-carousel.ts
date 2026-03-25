import { Component } from '@angular/core';

import { AutoHeightExample } from './auto-height-example/auto-height-example';
import { AutoPlay } from './auto-play/auto-play';
import { AutoWidhtExample } from './auto-widht-example/auto-widht-example';
import { CenterExample } from './center-example/center-example';
import { CrossFade } from './cross-fade/cross-fade';
import { LazyLoadExample } from './lazy-load-example/lazy-load-example';
import { ResponsiveExample } from './responsive-example/responsive-example';
import { RightLeftExample } from './right-left-example/right-left-example';
import { SlidesOnly } from './slides-only/slides-only';

@Component({
  selector: 'app-owl-carousel',
  imports: [
    AutoHeightExample,
    AutoPlay,
    AutoWidhtExample,
    CenterExample,
    CrossFade,
    LazyLoadExample,
    ResponsiveExample,
    RightLeftExample,
    SlidesOnly,
  ],
  templateUrl: './owl-carousel.html',
  styleUrl: './owl-carousel.scss',
})
export class OwlCarousel {}
