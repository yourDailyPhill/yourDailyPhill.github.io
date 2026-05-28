import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BlogPost } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);
  private readonly posts$ = this.http
    .get<BlogPost[]>('/assets/data/blog.json')
    .pipe(shareReplay(1));

  getPosts(): Observable<BlogPost[]> {
    return this.posts$;
  }

  getLatest(count: number): Observable<BlogPost[]> {
    return this.posts$.pipe(map((posts) => posts.slice(0, count)));
  }

  getBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.posts$.pipe(map((posts) => posts.find((p) => p.slug === slug)));
  }
}
