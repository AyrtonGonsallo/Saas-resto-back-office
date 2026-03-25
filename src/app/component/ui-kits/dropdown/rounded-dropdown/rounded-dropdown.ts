import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as Data from '../../../../shared/data/ui-kits/dropdown';

@Component({
  selector: 'app-rounded-dropdown',
  imports: [NgbModule],
  templateUrl: './rounded-dropdown.html',
  styleUrl: './rounded-dropdown.scss',
})
export class RoundedDropdown {
  public roundedDropdownData = Data.RoundedDropdown;
}
