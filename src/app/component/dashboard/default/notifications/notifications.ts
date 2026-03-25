import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Notification } from '../../../../shared/data/dashboard/default/default';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-notifications',
  imports: [RouterModule, ClickOutsideDirective],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications {
  public notificationData = Notification;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
