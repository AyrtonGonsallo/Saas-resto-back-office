import { Component } from '@angular/core';

import { CustomContentList } from '../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-custom-content-lists',
  imports: [],
  templateUrl: './custom-content-lists.html',
  styleUrl: './custom-content-lists.scss',
})
export class CustomContentLists {
  public customcontentData = CustomContentList;
}
