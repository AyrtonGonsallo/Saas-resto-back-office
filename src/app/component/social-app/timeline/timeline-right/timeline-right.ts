import { Component } from '@angular/core';

import { Followers } from './followers/followers';
import { Follwings } from './follwings/follwings';
import { FriendsProfile } from './friends-profile/friends-profile';
import { LatestPhotos } from './latest-photos/latest-photos';
import { ProfileIntro } from './profile-intro/profile-intro';

@Component({
  selector: 'app-timeline-right',
  imports: [Followers, Follwings, FriendsProfile, LatestPhotos, ProfileIntro],
  templateUrl: './timeline-right.html',
  styleUrl: './timeline-right.scss',
})
export class TimelineRight {}
