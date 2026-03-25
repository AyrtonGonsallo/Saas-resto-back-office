import { Routes } from '@angular/router';

export const Blog: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blog-details',
        loadComponent: () => import('./blog-details/blog-details').then(m => m.BlogDetails),
        data: {
          title: 'Blog Details',
          breadcrumb: 'Blog Details',
        },
      },
      {
        path: 'blog-single',
        loadComponent: () => import('./blog-single/blog-single').then(m => m.BlogSingle),
        data: {
          title: 'Blog Single',
          breadcrumb: 'Blog Single',
        },
      },
      {
        path: 'add-post',
        loadComponent: () => import('./blog-add-post/blog-add-post').then(m => m.BlogAddPost),
        data: {
          title: 'Add Post',
          breadcrumb: 'Add Post',
        },
      },
    ],
  },
];
