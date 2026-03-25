import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as Data from '../../../../shared/data/ui-kits/dropdown';

@Component({
  selector: 'app-alignments',
  imports: [NgbModule],
  templateUrl: './alignments.html',
  styleUrl: './alignments.scss',
})
export class Alignments {
  public alignmentsDropdownData = Data.AlignmentsDropdown;
}
