import { Component } from '@angular/core';

import { FeaturedTutorials } from './featured-tutorials/featured-tutorials';
import { LatestArticalVideos } from './latest-artical-videos/latest-artical-videos';
import { LatestUpdate } from './latest-update/latest-update';
import { Navigation } from './navigation/navigation';
import { Questions } from './questions/questions';
import { SerachArtical } from './serach-artical/serach-artical';
import { TopCommonFaq } from './top-common-faq/top-common-faq';
import {
  FaqTopPartData,
  articlesAndVideosData,
  featuredTutorialData,
} from '../../shared/data/faq/faq';

@Component({
  selector: 'app-faq',
  imports: [
    TopCommonFaq,
    FeaturedTutorials,
    LatestArticalVideos,
    LatestUpdate,
    Navigation,
    Questions,
    SerachArtical,
  ],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  public FaqTopPartData = FaqTopPartData;
  public featuredTutorialData = featuredTutorialData;
  public articlesAndVideosData = articlesAndVideosData;
}
