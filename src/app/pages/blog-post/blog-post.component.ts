import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { BlogService } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';
import { formatPostDate } from '../../core/utils/date-format';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly formatPostDate = formatPostDate;

  readonly post$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? ''),
    switchMap((slug) => this.blogService.getBySlug(slug)),
  );

  ngOnInit(): void {
    this.post$.subscribe((post) => {
      if (!post) {
        return;
      }
      this.seo.setPage({
        title: post.title,
        description: post.excerpt,
        path: `/blog/${post.slug}`,
      });
    });
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
