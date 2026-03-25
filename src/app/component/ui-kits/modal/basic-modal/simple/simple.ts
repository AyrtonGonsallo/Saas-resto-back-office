import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple',
  imports: [],
  templateUrl: './simple.html',
  styleUrl: './simple.scss',
})
export class Simple {
  private modalService = inject(NgbModal);

  simpleModal(simpleContent: TemplateRef<NgbModal>) {
    this.modalService.open(simpleContent);
  }
}
