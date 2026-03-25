import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fullscreen-xl-modal',
  imports: [],
  templateUrl: './fullscreen-xl-modal.html',
  styleUrl: './fullscreen-xl-modal.scss',
})
export class FullscreenXlModal {
  private modalService = inject(NgbModal);

  FullscreenbelowXlModal(FullscreenbelowXlContent: TemplateRef<NgbModal>) {
    this.modalService.open(FullscreenbelowXlContent, { size: 'xl' });
  }
}
