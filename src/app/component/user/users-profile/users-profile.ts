import { Component } from '@angular/core';

import { UserProfile1 } from './user-profile1/user-profile1';
import { UserProfile2 } from './user-profile2/user-profile2';
import { UserProfile3 } from './user-profile3/user-profile3';
import { UserProfile4 } from './user-profile4/user-profile4';
import { UserProfile5 } from './user-profile5/user-profile5';

@Component({
  selector: 'app-users-profile',
  imports: [UserProfile1, UserProfile2, UserProfile3, UserProfile4, UserProfile5],
  templateUrl: './users-profile.html',
  styleUrl: './users-profile.scss',
})
export class UsersProfile {}
