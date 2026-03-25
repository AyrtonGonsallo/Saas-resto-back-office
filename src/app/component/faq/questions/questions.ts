import { Component, inject } from '@angular/core';

import { NgbAccordionConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { questionData } from '../../../shared/data/faq/faq';

@Component({
  selector: 'app-questions',
  imports: [NgbModule],
  templateUrl: './questions.html',
  styleUrl: './questions.scss',
})
export class Questions {
  public questionData = questionData;

  private config = inject(NgbAccordionConfig);

  constructor() {
    this.config.closeOthers = true;
  }
}
