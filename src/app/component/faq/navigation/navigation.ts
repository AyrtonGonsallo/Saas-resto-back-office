import { Component } from '@angular/core';

import { navigationData1 } from '../../../shared/data/faq/faq';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  public navigationData = navigationData1;
}
