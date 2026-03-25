import { Component } from '@angular/core';

import { NgxPrintModule } from 'ngx-print';

import { Invoice6Table } from './invoice6-table/invoice6-table';

@Component({
  selector: 'app-invoice-6',
  imports: [Invoice6Table, NgxPrintModule],
  templateUrl: './invoice-6.html',
  styleUrl: './invoice-6.scss',
})
export class Invoice6 {}
