import { Component } from '@angular/core';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import { knowledgebaseData } from '../../../shared/data/knowledgebase/knowledgebase';
import { TopCommonFaq } from '../../faq/top-common-faq/top-common-faq';

@Component({
  selector: 'app-knowledgebase-top-data',
  imports: [Feathericon, TopCommonFaq],
  templateUrl: './knowledgebase-top-data.html',
  styleUrl: './knowledgebase-top-data.scss',
})
export class KnowledgebaseTopData {
  public knowledgebaseData = knowledgebaseData;
}
