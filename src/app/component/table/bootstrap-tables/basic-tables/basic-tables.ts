import { Component } from '@angular/core';

import { BorderBottomColor } from './border-bottom-color/border-bottom-color';
import { BreckpointSpecific } from './breckpoint-specific/breckpoint-specific';
import { Caption } from './caption/caption';
import { DashedBorder } from './dashed-border/dashed-border';
import { HoverStrippedTable } from './hover-stripped-table/hover-stripped-table';
import { HoverableRowsHorizontalBorder } from './hoverable-rows-horizontal-border/hoverable-rows-horizontal-border';
import { InverseTable } from './inverse-table/inverse-table';
import { InverseTablePrimaryBackground } from './inverse-table-primary-background/inverse-table-primary-background';
import { ResponsiveTablesLightBackground } from './responsive-tables-light-background/responsive-tables-light-background';
import { SizingTables } from './sizing-tables/sizing-tables';
import { StripedRowInverseTable } from './striped-row-inverse-table/striped-row-inverse-table';
import { TableHeadOptions } from './table-head-options/table-head-options';

@Component({
  selector: 'app-basic-tables',
  imports: [
    BorderBottomColor,
    BreckpointSpecific,
    Caption,
    DashedBorder,
    HoverStrippedTable,
    HoverableRowsHorizontalBorder,
    InverseTable,
    InverseTablePrimaryBackground,
    ResponsiveTablesLightBackground,
    SizingTables,
    StripedRowInverseTable,
    TableHeadOptions,
  ],
  templateUrl: './basic-tables.html',
  styleUrl: './basic-tables.scss',
})
export class BasicTables {}
