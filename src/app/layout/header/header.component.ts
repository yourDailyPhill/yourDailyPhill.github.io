import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);

  readonly nav = [
    { path: '/', label: 'Home', exact: true },
    { path: '/resume', label: 'Resume', exact: false },
    { path: '/blog', label: 'Blog', exact: false },
    { path: '/contact', label: 'Contact', exact: false },
  ];
}
