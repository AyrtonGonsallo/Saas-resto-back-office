import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-open-modal-edmin',
  templateUrl: './open-modal-edmin.html',
  styleUrl: './open-modal-edmin.scss',
})
export class OpenModalEdmin {
  public validate = false;

  private modalService = inject(NgbModal);

  public submit() {
    this.validate = !this.validate;
    this.validate = true;
  }

  OpenModal(openmodal: TemplateRef<NgbModal>) {
    this.modalService.open(openmodal);
  }
}
