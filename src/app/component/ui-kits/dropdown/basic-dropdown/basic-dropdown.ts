import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as Data from '../../../../shared/data/ui-kits/dropdown';

@Component({
  selector: 'app-basic-dropdown',
  imports: [NgbModule],
  templateUrl: './basic-dropdown.html',
  styleUrl: './basic-dropdown.scss',
})
export class BasicDropdown {
  public basicDropdownData = Data.basicDropdown;
}
