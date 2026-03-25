import { Component, inject } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as data from '../../../shared/data/letter-box/letter-box';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';
import { AddLabel } from '../letter-modal/add-label/add-label';
import { ComposeEmail } from '../letter-modal/compose-email/compose-email';
import { LetterboxUser } from '../letterbox-user/letterbox-user';

@Component({
  selector: 'app-letterbox-sidebar',
  imports: [ClickOutsideDirective, LetterboxUser],
  templateUrl: './letterbox-sidebar.html',
  styleUrl: './letterbox-sidebar.scss',
})
export class LetterboxSidebar {
  public email = data.emailFilter;
  public emailData: data.email;
  public selectedId: number;
  public statusData: boolean;
  public open: boolean = false;

  private modalService = inject(NgbModal);

  ngOnInit() {
    const getStatusData = this.email.filter(data => data.status === true);
    this.statusData = getStatusData[0]?.status;
  }

  letterbox(item: data.email) {
    const getdata = this.email.filter(data => data.id == item.id);
    this.selectedId = getdata[0].id;
    this.email.filter(data => {
      if (item.id == data.id) {
        data.status = true;
      } else {
        data.status = false;
      }
    });
  }

  composeEmail() {
    this.modalService.open(ComposeEmail, { size: 'lg' });
  }

  addlable() {
    this.modalService.open(AddLabel, { size: 'lg' });
  }

  openMenu() {
    this.open = !this.open;
  }

  clickOutside(): void {
    this.open = false;
  }
}
