import { Component } from '@angular/core';

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import * as Data from '../../../shared/data/social-media/social-media-data';

@Component({
  selector: 'app-images',
  imports: [GalleryModule, LightboxModule],
  templateUrl: './images.html',
  styleUrl: './images.scss',
})
export class Images {
  public photosData = Data.photosData;
}
