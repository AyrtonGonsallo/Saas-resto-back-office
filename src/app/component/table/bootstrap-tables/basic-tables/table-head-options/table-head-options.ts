import { Component } from '@angular/core';

import { tablehead } from '../../../../../shared/data/table//basic-tables';

@Component({
  selector: 'app-table-head-options',
  imports: [],
  templateUrl: './table-head-options.html',
  styleUrl: './table-head-options.scss',
})
export class TableHeadOptions {
  public headoptionsData = tablehead;
}
