import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

function blogSlugParams(): { slug: string }[] {
  try {
    const file = join(process.cwd(), 'src', 'assets', 'data', 'blog.json');
    const posts = JSON.parse(readFileSync(file, 'utf8')) as { slug: string }[];
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'resume', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => blogSlugParams(),
  },
  { path: '**', renderMode: RenderMode.Client },
];
