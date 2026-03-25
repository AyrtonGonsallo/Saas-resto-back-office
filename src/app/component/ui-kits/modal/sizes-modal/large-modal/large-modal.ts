import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-large-modal',
  imports: [],
  templateUrl: './large-modal.html',
  styleUrl: './large-modal.scss',
})
export class LargeModal {
  private modalService = inject(NgbModal);

  LargeModal(largeContent: TemplateRef<NgbModal>) {
    this.modalService.open(largeContent, { size: 'lg' });
  }
}
