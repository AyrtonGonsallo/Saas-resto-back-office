import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';

import { blogData } from '../../../shared/data/blog/blog-data';

@Component({
  selector: 'app-blog-details',
  imports: [SlicePipe],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.scss',
})
export class BlogDetails {
  public blog = blogData;
}
