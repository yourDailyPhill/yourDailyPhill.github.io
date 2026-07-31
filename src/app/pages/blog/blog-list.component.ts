import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';
import { formatPostDate } from '../../core/utils/date-format';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, SectionHeadingComponent],
  templateUrl: './blog-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  private readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);

  readonly posts$ = this.blogService.getPosts();
  readonly formatPostDate = formatPostDate;

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Blog',
      description: 'Articles on Angular, Java, cloud, testing, and software engineering.',
      path: '/blog',
    });
  }

}
