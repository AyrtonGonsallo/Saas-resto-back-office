import { Component } from '@angular/core';

import { Listcheckbox } from '../../../../shared/data/ui-kits/lists';

@Component({
  selector: 'app-checkbox-lists',
  imports: [],
  templateUrl: './checkbox-lists.html',
  styleUrl: './checkbox-lists.scss',
})
export class CheckboxLists {
  public listsCheckboxData = Listcheckbox;
}
