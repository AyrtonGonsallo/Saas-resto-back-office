import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fullscreen-xxl-modal',
  imports: [],
  templateUrl: './fullscreen-xxl-modal.html',
  styleUrl: './fullscreen-xxl-modal.scss',
})
export class FullscreenXxlModal {
  private modalService = inject(NgbModal);

  FullscreenbelowXxlModal(FullscreenbelowXxlContent: TemplateRef<NgbModal>) {
    this.modalService.open(FullscreenbelowXxlContent, { size: 'xxl' });
  }
}
