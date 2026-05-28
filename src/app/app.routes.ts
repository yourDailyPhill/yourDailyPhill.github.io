import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'resume',
        loadComponent: () => import('./pages/resume/resume.component').then((m) => m.ResumeComponent),
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog-list.component').then((m) => m.BlogListComponent),
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('./pages/blog-post/blog-post.component').then((m) => m.BlogPostComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
