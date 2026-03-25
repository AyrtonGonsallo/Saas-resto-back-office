import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-extra-large-modal',
  imports: [],
  templateUrl: './extra-large-modal.html',
  styleUrl: './extra-large-modal.scss',
})
export class ExtraLargeModal {
  private modalService = inject(NgbModal);

  ExtraLargemodal(ExtralargeContent: TemplateRef<NgbModal>) {
    this.modalService.open(ExtralargeContent, { size: 'xl' });
  }
}
