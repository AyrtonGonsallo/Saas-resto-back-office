import { Component } from '@angular/core';

import { avatarSize } from '../../../../shared/data/ui-kits/avavtar';

@Component({
  selector: 'app-sizes',
  imports: [],
  templateUrl: './sizes.html',
  styleUrl: './sizes.scss',
})
export class Sizes {
  public SizeData = avatarSize;
}
