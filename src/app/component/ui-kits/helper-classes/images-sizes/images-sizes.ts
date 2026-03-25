import { Component } from '@angular/core';

import { ImageSize } from '../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-images-sizes',
  imports: [],
  templateUrl: './images-sizes.html',
  styleUrl: './images-sizes.scss',
})
export class ImagesSizes {
  public ImagSizeData = ImageSize;
}
