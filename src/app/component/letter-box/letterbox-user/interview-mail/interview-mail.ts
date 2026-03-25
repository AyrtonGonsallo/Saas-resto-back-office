import { Component, output } from '@angular/core';

import { UserDetails } from './user-details/user-details';
import { Feathericon } from '../../../../shared/component/feathericon/feathericon';

@Component({
  selector: 'app-interview-mail',
  imports: [UserDetails, Feathericon],
  templateUrl: './interview-mail.html',
  styleUrl: './interview-mail.scss',
})
export class InterviewMail {
  readonly filterValue = output<boolean>();
  public open: boolean = false;
  public active: boolean = false;

  openFilter() {
    this.open = !this.open;
    this.filterValue.emit(this.open);
  }

  openmenu() {
    this.active = !this.active;
  }
}
