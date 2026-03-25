import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as Data from '../../../../shared/data/ui-kits/dropdown';

@Component({
  selector: 'app-helper-dropdown',
  imports: [NgbModule],
  templateUrl: './helper-dropdown.html',
  styleUrl: './helper-dropdown.scss',
})
export class HelperDropdown {
  public helpercardData = Data.HelperCard;
}
