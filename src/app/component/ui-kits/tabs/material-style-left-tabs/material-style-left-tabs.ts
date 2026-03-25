import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Feathericon } from '../../../../shared/component/feathericon/feathericon';

@Component({
  selector: 'app-material-style-left-tabs',
  imports: [NgbModule, FormsModule, Feathericon],
  templateUrl: './material-style-left-tabs.html',
  styleUrl: './material-style-left-tabs.scss',
})
export class MaterialStyleLeftTabs {
  public active = 1;
}
