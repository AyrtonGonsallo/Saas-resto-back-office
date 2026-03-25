import { Component } from '@angular/core';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import { browseArticlesData } from '../../../shared/data/knowledgebase/knowledgebase';

@Component({
  selector: 'app-browse-artical-categories',
  imports: [Feathericon],
  templateUrl: './browse-artical-categories.html',
  styleUrl: './browse-artical-categories.scss',
})
export class BrowseArticalCategories {
  public browseArticlesData = browseArticlesData;
}
