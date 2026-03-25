import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toggle-between-modals',
  imports: [],
  templateUrl: './toggle-between-modals.html',
  styleUrl: './toggle-between-modals.scss',
})
export class ToggleBetweenModals {
  public modalRef1: NgbModalRef;

  private modalService = inject(NgbModal);

  togglefristmodal(togglefristcontent: TemplateRef<NgbModal>) {
    this.modalRef1 = this.modalService.open(togglefristcontent, { centered: true });
  }

  togglesecoundmodal(togglesecoundcontent: TemplateRef<NgbModal>) {
    this.modalService.open(togglesecoundcontent, { centered: true });
    this.modalRef1.dismiss();
  }
}
