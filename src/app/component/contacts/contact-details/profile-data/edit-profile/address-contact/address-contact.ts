import { Component, input } from '@angular/core';

import * as data from '../../../../../../shared/data/contacts/all-contact';

@Component({
  selector: 'app-address-contact',
  imports: [],
  templateUrl: './address-contact.html',
  styleUrl: './address-contact.scss',
})
export class AddressContact {
  public editContact: boolean = true;

  readonly lastData = input<data.lastDataList>();
}
