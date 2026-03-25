import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vertical-tabs',
  imports: [NgbModule, FormsModule],
  templateUrl: './vertical-tabs.html',
  styleUrl: './vertical-tabs.scss',
})
export class VerticalTabs {
  public active = 2;
}
