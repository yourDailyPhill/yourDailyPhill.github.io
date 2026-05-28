import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { ResumeService } from '../../core/services/resume.service';
import { SeoService } from '../../core/services/seo.service';
import { formatPostDate } from '../../core/utils/date-format';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, RouterLink, SectionHeadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly resumeService = inject(ResumeService);
  private readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);

  readonly resume$ = this.resumeService.getResume();
  readonly posts$ = this.blogService.getLatest(3);
  readonly formatPostDate = formatPostDate;

  ngOnInit(): void {
    this.resume$.subscribe((resume) => {
      const sameAs = [resume.profile.links.github];
      if (resume.profile.links.linkedin) {
        sameAs.push(resume.profile.links.linkedin);
      }

      this.seo.setPage({
        title: 'Phillip Raich',
        description: resume.profile.about,
        path: '/',
      });
      this.seo.setPersonJsonLd({
        name: resume.profile.name,
        title: resume.profile.title,
        email: resume.profile.email,
        url: 'https://yourDailyPhill.github.io',
        sameAs,
      });
    });
  }

}
