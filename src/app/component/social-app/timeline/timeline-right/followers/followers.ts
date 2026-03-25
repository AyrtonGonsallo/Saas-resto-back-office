import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as data from '../../../../../shared/data/social-media/social-media-data';

@Component({
  selector: 'app-followers',
  imports: [NgbModule],
  templateUrl: './followers.html',
  styleUrl: './followers.scss',
})
export class Followers {
  public followersData = data.Followers;
}
