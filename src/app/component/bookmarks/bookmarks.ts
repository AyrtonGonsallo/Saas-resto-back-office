import { Component } from '@angular/core';

import { BookmarkData } from './bookmark-data/bookmark-data';
import { BookmarkSidemenu } from './bookmark-sidemenu/bookmark-sidemenu';

@Component({
  selector: 'app-bookmarks',
  imports: [BookmarkData, BookmarkSidemenu],
  templateUrl: './bookmarks.html',
  styleUrl: './bookmarks.scss',
})
export class Bookmarks {
  public activeTab: string;

  getTab(value: string) {
    this.activeTab = value;
  }
}
