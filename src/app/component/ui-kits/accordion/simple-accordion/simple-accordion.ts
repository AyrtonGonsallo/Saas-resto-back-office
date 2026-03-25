import { Component } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { simpleAccordion } from '../../../../shared/data/ui-kits/accordion';

@Component({
  selector: 'app-simple-accordion',
  imports: [NgbModule],
  templateUrl: './simple-accordion.html',
  styleUrl: './simple-accordion.scss',
})
export class SimpleAccordion {
  public simpleAccordionData = simpleAccordion;
}
