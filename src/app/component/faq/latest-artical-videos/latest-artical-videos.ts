import { Component, input } from '@angular/core';

import { articlesAndVideos } from '../../../shared/data/faq/faq';

@Component({
  selector: 'app-latest-artical-videos',
  imports: [],
  templateUrl: './latest-artical-videos.html',
  styleUrl: './latest-artical-videos.scss',
})
export class LatestArticalVideos {
  readonly data = input<articlesAndVideos[]>();
}
