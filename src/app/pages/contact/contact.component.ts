import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ResumeService } from '../../core/services/resume.service';
import { SeoService } from '../../core/services/seo.service';
import { SectionHeadingComponent } from '../../shared/section-heading/section-heading.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AsyncPipe, SectionHeadingComponent],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly resumeService = inject(ResumeService);
  private readonly seo = inject(SeoService);

  readonly resume$ = this.resumeService.getResume();

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Contact',
      description: 'Get in touch with Phillip Raich — email, phone, and GitHub.',
      path: '/contact',
    });
  }
}
