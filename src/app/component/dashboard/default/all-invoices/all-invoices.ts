import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AllInvoice } from '../../../../shared/data/dashboard/default/default';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-all-invoices',
  imports: [ClickOutsideDirective, RouterModule],
  templateUrl: './all-invoices.html',
  styleUrl: './all-invoices.scss',
})
export class AllInvoices {
  public InvoiceData = AllInvoice;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
