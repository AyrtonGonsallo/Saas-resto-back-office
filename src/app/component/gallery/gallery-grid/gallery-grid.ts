import { Component, inject } from '@angular/core';

import {
  Gallery,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  GalleryModule,
} from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';

import { galleryGridData } from '../../../shared/data/gallery/gallery-grid';

@Component({
  selector: 'app-gallery-grid',
  imports: [LightboxModule, GalleryModule],
  templateUrl: './gallery-grid.html',
  styleUrl: './gallery-grid.scss',
})
export class GalleryGrid {
  public galleryGridData = galleryGridData;
  public items: GalleryItem[];

  public gallery = inject(Gallery);
  public lightbox = inject(Lightbox);

  ngOnInit() {
    this.items = this.galleryGridData.map(
      item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }),
    );
    const lightboxRef = this.gallery.ref('lightbox');

    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    lightboxRef.load(this.items);
  }
}
