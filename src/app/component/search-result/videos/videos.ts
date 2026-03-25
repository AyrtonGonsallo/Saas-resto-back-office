import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as Data from '../../../shared/data/search-result/search-result';

@Component({
  selector: 'app-videos',
  imports: [],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos {
  public videosData = Data.videosData;

  public sanitizer = inject(DomSanitizer);

  safe(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
