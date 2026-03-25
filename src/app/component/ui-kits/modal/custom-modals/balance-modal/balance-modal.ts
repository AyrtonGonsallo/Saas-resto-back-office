import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Feathericon } from '../../../../../shared/component/feathericon/feathericon';

@Component({
  selector: 'app-balance-modal',
  imports: [Feathericon],
  templateUrl: './balance-modal.html',
  styleUrl: './balance-modal.scss',
})
export class BalanceModal {
  private modalService = inject(NgbModal);

  BalanceModal(Balancecontant: TemplateRef<NgbModal>) {
    this.modalService.open(Balancecontant, { centered: true });
  }
}
