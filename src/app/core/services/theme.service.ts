
import { Injectable, PLATFORM_ID, inject, signal, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  readonly dark = signal(false);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = stored === 'dark' || (!stored && prefersDark);
    this.setDark(useDark);
  }

  toggle(): void {
    this.setDark(!this.dark());
  }

  setDark(value: boolean): void {
    this.dark.set(value);
    this.document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light');

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light');
    }
  }
}
