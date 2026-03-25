import { Component } from '@angular/core';

import { DifferntTagAccordion } from './differnt-tag-accordion/differnt-tag-accordion';
import { FlushAccordion } from './flush-accordion/flush-accordion';
import { HorizontalAccordion } from './horizontal-accordion/horizontal-accordion';
import { IconsAccordion } from './icons-accordion/icons-accordion';
import { MultipleCollapseAccordion } from './multiple-collapse-accordion/multiple-collapse-accordion';
import { NestedAccordion } from './nested-accordion/nested-accordion';
import { SimpleAccordion } from './simple-accordion/simple-accordion';

@Component({
  selector: 'app-accordion',
  imports: [
    SimpleAccordion,
    FlushAccordion,
    IconsAccordion,
    MultipleCollapseAccordion,
    HorizontalAccordion,
    NestedAccordion,
    DifferntTagAccordion,
  ],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {}
