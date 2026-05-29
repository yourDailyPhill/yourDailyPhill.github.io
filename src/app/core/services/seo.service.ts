import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_URL } from '../config/site-url';

export interface PageSeo {
  title: string;
  description: string;
  path?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly siteName = 'Phillip Raich';
  private readonly baseUrl = SITE_URL;

  setPage(seo: PageSeo): void {
    const fullTitle = seo.title === this.siteName ? seo.title : `${seo.title} | ${this.siteName}`;
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    if (seo.path) {
      const url = `${this.baseUrl}${seo.path}`;
      this.meta.updateTag({ property: 'og:url', content: url });
      this.setCanonical(url);
    }
  }

  setPersonJsonLd(profile: {
    name: string;
    title: string;
    email: string;
    url: string;
    sameAs: string[];
  }): void {
    const scriptId = 'person-json-ld';
    let script = this.document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      email: profile.email,
      url: profile.url,
      sameAs: profile.sameAs,
    });
  }

  private setCanonical(url: string): void {
    const linkId = 'canonical-link';
    let link = this.document.getElementById(linkId) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.id = linkId;
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }

    link.href = url;
  }
}
