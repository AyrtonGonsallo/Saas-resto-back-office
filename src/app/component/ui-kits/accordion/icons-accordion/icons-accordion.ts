import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconsAccordions } from '../../../../shared/data/ui-kits/accordion';

@Component({
  selector: 'app-icons-accordion',
  imports: [NgbModule],
  templateUrl: './icons-accordion.html',
  styleUrl: './icons-accordion.scss',
})
export class IconsAccordion {
  public iconaccordionData = IconsAccordions;
}
