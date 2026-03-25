import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-full-screen-modal',
  imports: [],
  templateUrl: './full-screen-modal.html',
  styleUrl: './full-screen-modal.scss',
})
export class FullScreenModal {
  private modalService = inject(NgbModal);

  FullScreenModal(fullScreenContent: TemplateRef<NgbModal>) {
    this.modalService.open(fullScreenContent, { fullscreen: true });
  }
}
