import { Component, signal, inject, effect } from '@angular/core';
import { RouterLink, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule, LanguageSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  isStickyHeader = signal(false);
  mobileMenuOpen = signal(false);

  constructor() {
    // Listen for navigation events and update the sticky header signal
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.updateStickyHeader();
    });

    // Initial check on component init
    this.updateStickyHeader();
  }

  private updateStickyHeader(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const stickyHeader = route.snapshot.data['stickyHeader'] === true;
    this.isStickyHeader.set(stickyHeader);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
