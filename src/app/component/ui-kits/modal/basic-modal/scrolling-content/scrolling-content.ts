import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalData } from '../../../../../shared/data/ui-kits/modal';

@Component({
  selector: 'app-scrolling-content',
  imports: [],
  templateUrl: './scrolling-content.html',
  styleUrl: './scrolling-content.scss',
})
export class ScrollingContent {
  public scrollData = ModalData;
  private modalService = inject(NgbModal);

  scrollingModal(scrollingContent: TemplateRef<NgbModal>) {
    this.modalService.open(scrollingContent);
  }
}
