import { Component } from '@angular/core';

import { StripedData } from '../../../../../shared/data/table/basic-tables';

@Component({
  selector: 'app-striped-row-inverse-table',
  imports: [],
  templateUrl: './striped-row-inverse-table.html',
  styleUrl: './striped-row-inverse-table.scss',
})
export class StripedRowInverseTable {
  public striped = StripedData;
}
