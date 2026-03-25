import { Component } from '@angular/core';

import { NgxPrintModule } from 'ngx-print';

import { Invoice2Table } from './invoice2-table/invoice2-table';
import { Invoice2Total } from './invoice2-total/invoice2-total';

@Component({
  selector: 'app-invoice-2',
  imports: [Invoice2Table, Invoice2Total, NgxPrintModule],
  templateUrl: './invoice-2.html',
  styleUrl: './invoice-2.scss',
})
export class Invoice2 {}
