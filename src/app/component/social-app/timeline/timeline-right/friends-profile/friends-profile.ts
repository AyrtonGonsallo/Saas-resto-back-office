import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as data from '../../../../../shared/data/social-media/social-media-data';

@Component({
  selector: 'app-friends-profile',
  imports: [NgbModule],
  templateUrl: './friends-profile.html',
  styleUrl: './friends-profile.scss',
})
export class FriendsProfile {
  public friednsData = data.Friends;
}
