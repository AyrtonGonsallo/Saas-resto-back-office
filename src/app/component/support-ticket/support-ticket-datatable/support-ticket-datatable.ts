import { DecimalPipe, AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, viewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { supportDB } from '../../../shared/data/support-ticket/support-ticket';
import {
  NgbdSortableHeader2Directive,
  SortEvent,
} from '../../../shared/directives/support-ticket.directive';
import { SupportTicketService } from '../../../shared/services/support-ticket.service';

@Component({
  selector: 'app-support-ticket-datatable',
  imports: [
    NgbdSortableHeader2Directive,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AsyncPipe,
    DecimalPipe,
    NgClass,
  ],
  providers: [SupportTicketService, DecimalPipe],
  templateUrl: './support-ticket-datatable.html',
  styleUrl: './support-ticket-datatable.scss',
})
export class SupportTicketDatatable {
  public service = inject(SupportTicketService);

  public countries$: Observable<supportDB[]> = this.service.support$;
  public total$: Observable<number> = this.service.total$;
  public Data: supportDB[];

  readonly headers = viewChildren(NgbdSortableHeader2Directive);

  ngOnInit() {
    this.countries$.subscribe(res => {
      this.Data = res;
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.headers().forEach(header => {
      if (header.sortable() !== column) {
        header.currentDirection.set('');
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
