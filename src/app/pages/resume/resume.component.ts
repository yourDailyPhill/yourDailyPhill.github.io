import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ResumeService } from '../../core/services/resume.service';
import { SeoService } from '../../core/services/seo.service';
import { formatDateRange, formatMonthYear } from '../../core/utils/date-format';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [AsyncPipe, SectionHeadingComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent implements OnInit {
  private readonly resumeService = inject(ResumeService);
  private readonly seo = inject(SeoService);

  readonly resume$ = this.resumeService.getResume();
  readonly formatDateRange = formatDateRange;
  readonly formatMonthYear = formatMonthYear;

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Resume',
      description:
        'Resume of Phillip Raich — Computer Engineer with enterprise Java, Angular, cloud, and quality engineering experience.',
      path: '/resume',
    });
  }

  print(): void {
    window.print();
  }
}
