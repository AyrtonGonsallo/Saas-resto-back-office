import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactSearch } from './contact-search/contact-search';
import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import { Chats, Contacts } from '../../../shared/data/chat/chat';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';

@Component({
  selector: 'app-contact-chat-tab',
  imports: [ContactSearch, NgbModule, Feathericon, ClickOutsideDirective],
  templateUrl: './contact-chat-tab.html',
  styleUrl: './contact-chat-tab.scss',
})
export class ContactChatTab {
  public active = 1;
  public privateData = Chats;
  public contactsData = Contacts;

  openMenu(id: number) {
    this.contactsData.filter(da => {
      da.item.forEach(data => {
        if (data.id == id) {
          data.isActive = !data.isActive;
        }
      });
    });
  }
}
