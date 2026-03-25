import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-icons-tabs',
  imports: [NgbModule, FormsModule],
  templateUrl: './icons-tabs.html',
  styleUrl: './icons-tabs.scss',
})
export class IconsTabs {
  public active = 1;
}
