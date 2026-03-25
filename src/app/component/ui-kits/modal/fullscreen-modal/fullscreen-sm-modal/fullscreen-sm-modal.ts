import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fullscreen-sm-modal',
  imports: [],
  templateUrl: './fullscreen-sm-modal.html',
  styleUrl: './fullscreen-sm-modal.scss',
})
export class FullscreenSmModal {
  private modalService = inject(NgbModal);

  FullscreenbelowSmModal(FullscreenbelowSmContent: TemplateRef<NgbModal>) {
    this.modalService.open(FullscreenbelowSmContent, { size: 'sm' });
  }
}
