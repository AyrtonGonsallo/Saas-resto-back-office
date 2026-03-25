import { Component, input } from '@angular/core';

import * as data from '../../../../../../shared/data/contacts/all-contact';

@Component({
  selector: 'app-general',
  imports: [],
  templateUrl: './general.html',
  styleUrl: './general.scss',
})
export class General {
  readonly lastData = input<data.lastDataList>();
}
