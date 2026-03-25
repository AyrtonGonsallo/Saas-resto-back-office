import { Component } from '@angular/core';

import { ContactChatTab } from '../contact-chat-tab/contact-chat-tab';
import { UserPrivateChat } from './user-private-chat/user-private-chat';

@Component({
  selector: 'app-private-chat',
  imports: [ContactChatTab, UserPrivateChat],
  templateUrl: './private-chat.html',
  styleUrl: './private-chat.scss',
})
export class PrivateChat {}
