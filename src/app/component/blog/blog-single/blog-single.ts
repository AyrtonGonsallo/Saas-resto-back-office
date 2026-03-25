import { Component } from '@angular/core';

import { BlogComment } from './blog-comment/blog-comment';
import { commentsData } from '../../../shared/data/blog/blog-data';

@Component({
  selector: 'app-blog-single',
  imports: [BlogComment],
  templateUrl: './blog-single.html',
  styleUrl: './blog-single.scss',
})
export class BlogSingle {
  public commentsData = commentsData;
}
