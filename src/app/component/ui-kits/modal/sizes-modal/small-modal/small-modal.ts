import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-small-modal',
  imports: [],
  templateUrl: './small-modal.html',
  styleUrl: './small-modal.scss',
})
export class SmallModal {
  private modalService = inject(NgbModal);

  SmallModal(smallContent: TemplateRef<NgbModal>) {
    this.modalService.open(smallContent, { size: 'sm' });
  }
}
