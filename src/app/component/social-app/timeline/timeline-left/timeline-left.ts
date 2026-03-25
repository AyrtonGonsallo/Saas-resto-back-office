import { Component } from '@angular/core';

import { ActivityFeed } from './activity-feed/activity-feed';
import { MutualFriends } from './mutual-friends/mutual-friends';
import { MyProfile } from './my-profile/my-profile';

@Component({
  selector: 'app-timeline-left',
  imports: [MyProfile, ActivityFeed, MutualFriends],
  templateUrl: './timeline-left.html',
  styleUrl: './timeline-left.scss',
})
export class TimelineLeft {}
