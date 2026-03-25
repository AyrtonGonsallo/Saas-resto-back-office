import { Component } from '@angular/core';

import { ContactSidebar } from './contact-sidebar/contact-sidebar';

@Component({
  selector: 'app-contacts',
  imports: [ContactSidebar],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {}
