import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ResumeData } from '../models/resume.model';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private readonly http = inject(HttpClient);
  private readonly data$ = this.http
    .get<ResumeData>('/assets/data/resume.json')
    .pipe(shareReplay(1));

  getResume(): Observable<ResumeData> {
    return this.data$;
  }
}
