import { Component } from '@angular/core';

import { NgxPrintModule } from 'ngx-print';

import { Invoice5Table } from './invoice5-table/invoice5-table';

@Component({
  selector: 'app-invoice-5',
  imports: [Invoice5Table, NgxPrintModule],
  templateUrl: './invoice-5.html',
  styleUrl: './invoice-5.scss',
})
export class Invoice5 {}
