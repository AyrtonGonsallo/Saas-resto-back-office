import { Component } from '@angular/core';

import { InverseTables } from '../../../../../shared/data/table/basic-tables';

@Component({
  selector: 'app-inverse-table',
  imports: [],
  templateUrl: './inverse-table.html',
  styleUrl: './inverse-table.scss',
})
export class InverseTable {
  public inversetableData = InverseTables;
}
