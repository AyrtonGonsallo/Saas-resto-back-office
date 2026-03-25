import { Component, input } from '@angular/core';

import { titleData } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-common-borderstyle',
  imports: [],
  templateUrl: './common-borderstyle.html',
  styleUrl: './common-borderstyle.scss',
})
export class CommonBorderstyle {
  readonly data = input<titleData[]>();
}
