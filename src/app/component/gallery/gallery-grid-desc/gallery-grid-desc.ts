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

import { gallerydes } from '../../../shared/data/gallery/gallery-grid';

@Component({
  selector: 'app-gallery-grid-desc',
  imports: [LightboxModule, GalleryModule],
  templateUrl: './gallery-grid-desc.html',
  styleUrl: './gallery-grid-desc.scss',
})
export class GalleryGridDesc {
  public galleryGrid = gallerydes;
  public items: GalleryItem[];

  public gallery = inject(Gallery);
  public lightbox = inject(Lightbox);

  ngOnInit() {
    this.items = this.galleryGrid.map(
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
