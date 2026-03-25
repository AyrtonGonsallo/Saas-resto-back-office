import { Component, inject, TemplateRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-modal',
  imports: [],
  templateUrl: './profile-modal.html',
  styleUrl: './profile-modal.scss',
})
export class ProfileModal {
  private modalService = inject(NgbModal);

  profilemodal(profilecontant: TemplateRef<NgbModal>) {
    this.modalService.open(profilecontant, { centered: true });
  }
}
