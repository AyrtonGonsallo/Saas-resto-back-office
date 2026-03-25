import { Component } from '@angular/core';

import { Listradios } from '../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-radios-lists',
  imports: [],
  templateUrl: './radios-lists.html',
  styleUrl: './radios-lists.scss',
})
export class RadiosLists {
  public listradiosData = Listradios;
}
