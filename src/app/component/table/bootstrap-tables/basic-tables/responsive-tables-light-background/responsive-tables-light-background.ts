import { Component } from '@angular/core';

import { responsiveTable } from '../../../../../shared/data/table/basic-tables';

@Component({
  selector: 'app-responsive-tables-light-background',
  imports: [],
  templateUrl: './responsive-tables-light-background.html',
  styleUrl: './responsive-tables-light-background.scss',
})
export class ResponsiveTablesLightBackground {
  public responiveData = responsiveTable;
}
