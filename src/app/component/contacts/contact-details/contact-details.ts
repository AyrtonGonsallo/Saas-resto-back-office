import { Component, SimpleChanges, input } from '@angular/core';

import { ProfileData } from './profile-data/profile-data';
import * as data from '../../../shared/data/contacts/all-contact';

@Component({
  selector: 'app-contact-details',
  imports: [ProfileData],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})
export class ContactDetails {
  readonly selectedId = input<number>();
  readonly statusData = input<boolean>();

  public Personal = data.Personal;
  public Organization = data.Organization;
  public getTaskData: data.contactData;
  public lastData: data.lastDataList;
  public editContact: boolean = false;
  public open: boolean = false;

  ngOnInit() {
    this.Personal.map(data => {
      if (data.status) {
        this.getTaskData = data;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    let oragnization_Id = changes['selectedId']?.currentValue;
    this.Organization.map(data => {
      if (data.title_id === oragnization_Id) {
        this.getTaskData = data;
      }
    });

    let persnol_Id = changes['selectedId']?.currentValue;
    this.Personal.map(data => {
      if (data.title_id === persnol_Id) {
        this.getTaskData = data;
      }
    });
  }

  changeData(list: data.lastDataList) {
    this.lastData = list;
    if (!list.status) {
      this.getTaskData.data.forEach((a: data.lastDataList) => {
        a.status = false;
      });
    }
    list.status = !list.status;
  }

  openHistory() {
    this.open = !this.open;
  }
}
