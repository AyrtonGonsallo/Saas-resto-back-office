import { DecimalPipe, AsyncPipe } from '@angular/common';
import { Component, inject, viewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import {
  NgbdSortableHeaderDirective,
  SortEvent,
} from '../../../shared/directives/sortable.directive';
import { supportDB } from '../../../shared/interface/support';
import { TableService } from '../../../shared/services/table.service';

@Component({
  selector: 'app-data-table',
  imports: [
    FormsModule,
    NgbdSortableHeaderDirective,
    ReactiveFormsModule,
    NgbModule,
    AsyncPipe,
    DecimalPipe,
  ],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
  providers: [TableService, DecimalPipe],
})
export class DataTables {
  public service = inject(TableService);

  public tableData$: Observable<supportDB[]> = this.service.supportdata$;
  public total$: Observable<number> = this.service.total$;
  public Data: supportDB[];

  readonly headers = viewChildren(NgbdSortableHeaderDirective);

  ngOnInit() {
    this.tableData$.subscribe(res => {
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
