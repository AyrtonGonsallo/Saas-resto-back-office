import { Component, input } from '@angular/core';

import { comments } from '../../../../shared/data/blog/blog-data';

@Component({
  selector: 'app-blog-comment',
  imports: [],
  templateUrl: './blog-comment.html',
  styleUrl: './blog-comment.scss',
})
export class BlogComment {
  readonly data = input<comments[]>();
}
