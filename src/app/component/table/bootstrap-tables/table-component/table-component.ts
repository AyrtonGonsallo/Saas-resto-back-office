import { Component } from '@angular/core';

import { AlertsTable } from './alerts-table/alerts-table';
import { BadgesTable } from './badges-table/badges-table';
import { CheckboxTable } from './checkbox-table/checkbox-table';
import { InputTable } from './input-table/input-table';
import { ProgressbarTable } from './progressbar-table/progressbar-table';
import { RadioTable } from './radio-table/radio-table';
import { SelectTable } from './select-table/select-table';
import { SwitchTable } from './switch-table/switch-table';
import { TooltipTable } from './tooltip-table/tooltip-table';
import { UiTable } from './ui-table/ui-table';

@Component({
  selector: 'app-table-component',
  imports: [
    AlertsTable,
    BadgesTable,
    CheckboxTable,
    InputTable,
    ProgressbarTable,
    RadioTable,
    SelectTable,
    SwitchTable,
    TooltipTable,
    UiTable,
  ],
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
})
export class TableComponent {}
