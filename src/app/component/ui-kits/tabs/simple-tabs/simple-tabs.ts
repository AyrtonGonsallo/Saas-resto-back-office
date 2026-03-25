import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simple-tabs',
  imports: [NgbModule, FormsModule],
  templateUrl: './simple-tabs.html',
  styleUrl: './simple-tabs.scss',
})
export class SimpleTabs {
  public active = 2;
}
