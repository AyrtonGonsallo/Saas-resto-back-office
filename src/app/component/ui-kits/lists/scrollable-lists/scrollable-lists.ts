import { Component } from '@angular/core';

import { ScrollableList } from '../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-scrollable-lists',
  imports: [],
  templateUrl: './scrollable-lists.html',
  styleUrl: './scrollable-lists.scss',
})
export class ScrollableLists {
  public scrollableData = ScrollableList;
}
