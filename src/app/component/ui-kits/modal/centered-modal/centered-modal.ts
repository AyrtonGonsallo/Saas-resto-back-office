import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-centered-modal',
  imports: [NgbModule],
  templateUrl: './centered-modal.html',
  styleUrl: './centered-modal.scss',
})
export class CenteredModal {
  private modalService = inject(NgbModal);

  CenteredModal(CenteredContent: TemplateRef<NgbModal>) {
    this.modalService.open(CenteredContent, { centered: true });
  }
}
