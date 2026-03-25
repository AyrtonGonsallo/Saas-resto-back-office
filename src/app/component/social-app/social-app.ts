import { Component } from '@angular/core';

import { SoicalProfile } from './soical-profile/soical-profile';

@Component({
  selector: 'app-social-app',
  imports: [SoicalProfile],
  templateUrl: './social-app.html',
  styleUrl: './social-app.scss',
})
export class SocialApp {}
