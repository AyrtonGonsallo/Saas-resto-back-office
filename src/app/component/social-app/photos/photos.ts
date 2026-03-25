import { Component } from '@angular/core';

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import * as Data from '../../../shared/data/social-media/social-media-data';

@Component({
  selector: 'app-photos',
  imports: [GalleryModule, LightboxModule],
  templateUrl: './photos.html',
  styleUrl: './photos.scss',
})
export class Photos {
  public photosData = Data.photosData;
}
