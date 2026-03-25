import { Component } from '@angular/core';

import { topcommonlists } from '../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-top-common-lists',
  imports: [],
  templateUrl: './top-common-lists.html',
  styleUrl: './top-common-lists.scss',
})
export class TopCommonLists {
  public commonLists = topcommonlists;
}
