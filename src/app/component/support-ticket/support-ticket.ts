import { Component } from '@angular/core';

import { SupportTicketDatatable } from './support-ticket-datatable/support-ticket-datatable';
import { SupportTicketList } from './support-ticket-list/support-ticket-list';

@Component({
  selector: 'app-support-ticket',
  imports: [SupportTicketDatatable, SupportTicketList],
  templateUrl: './support-ticket.html',
  styleUrl: './support-ticket.scss',
})
export class SupportTickets {}
