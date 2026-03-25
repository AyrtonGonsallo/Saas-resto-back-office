import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tooltips-popovers',
  imports: [],
  templateUrl: './tooltips-popovers.html',
  styleUrl: './tooltips-popovers.scss',
})
export class TooltipsPopovers {
  private modalService = inject(NgbModal);

  tooltipModal(tooltipmodalContent: TemplateRef<NgbModal>) {
    this.modalService.open(tooltipmodalContent);
  }
}
