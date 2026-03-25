import { Component } from '@angular/core';

import { BrowseArticalCategories } from './browse-artical-categories/browse-artical-categories';
import { KnowledgebaseFooterData } from './knowledgebase-footer-data/knowledgebase-footer-data';
import { KnowledgebaseTopData } from './knowledgebase-top-data/knowledgebase-top-data';
import * as data from '../../shared/data/knowledgebase/knowledgebase';
import { FeaturedTutorials } from '../faq/featured-tutorials/featured-tutorials';

@Component({
  selector: 'app-knowledgebase',
  imports: [
    KnowledgebaseFooterData,
    KnowledgebaseTopData,
    BrowseArticalCategories,
    FeaturedTutorials,
  ],
  templateUrl: './knowledgebase.html',
  styleUrl: './knowledgebase.scss',
})
export class Knowledgebase {
  public featuredTutorialData = data.featuredTutorialData;
}
