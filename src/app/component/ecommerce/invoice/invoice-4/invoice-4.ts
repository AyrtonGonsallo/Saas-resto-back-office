import { Component } from '@angular/core';

import { NgxPrintModule } from 'ngx-print';

import { Invoice4Table } from './invoice4-table/invoice4-table';

@Component({
  selector: 'app-invoice-4',
  imports: [NgxPrintModule, Invoice4Table],
  templateUrl: './invoice-4.html',
  styleUrl: './invoice-4.scss',
})
export class Invoice4 {}
