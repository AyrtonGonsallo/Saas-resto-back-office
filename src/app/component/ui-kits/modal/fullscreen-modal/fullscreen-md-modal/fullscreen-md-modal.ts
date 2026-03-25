import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fullscreen-md-modal',
  imports: [],
  templateUrl: './fullscreen-md-modal.html',
  styleUrl: './fullscreen-md-modal.scss',
})
export class FullscreenMdModal {
  private modalService = inject(NgbModal);

  FullscreenbelowMdModal(FullscreenbelowMdContent: TemplateRef<NgbModal>) {
    this.modalService.open(FullscreenbelowMdContent, { size: 'md' });
  }
}
