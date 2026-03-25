import { Component } from '@angular/core';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';
import { massage } from '../../../../shared/data/chat/chat';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-user-group-chat',
  imports: [ClickOutsideDirective, Feathericon],
  templateUrl: './user-group-chat.html',
  styleUrl: './user-group-chat.scss',
})
export class UserGroupChat {
  public MsgData = massage;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen;
  }

  clickOutside(): void {
    this.isopen = false;
  }
}
