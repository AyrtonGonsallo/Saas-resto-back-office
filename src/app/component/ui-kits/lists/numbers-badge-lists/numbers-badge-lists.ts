import { Component } from '@angular/core';

import { NumberedBadgeLists } from '../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-numbers-badge-lists',
  imports: [],
  templateUrl: './numbers-badge-lists.html',
  styleUrl: './numbers-badge-lists.scss',
})
export class NumbersBadgeLists {
  public NumberedBadgeData = NumberedBadgeLists;
}
