import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { YourStay } from './pages/your-stay/your-stay';
import { ContactUs } from './pages/contact-us/contact-us';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { TermsOfService } from './pages/terms-of-service/terms-of-service';
import { CookiesSettings } from './pages/cookies-settings/cookies-settings';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: { stickyHeader: true },
  },
  {
    path: 'your-stay',
    component: YourStay,
  },
  {
    path: 'contact-us',
    component: ContactUs,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy,
  },
  {
    path: 'terms-of-service',
    component: TermsOfService,
  },
  {
    path: 'cookies-settings',
    component: CookiesSettings,
  },
  // Everything else goes to:
  {
    path: '**',
    component: NotFound,
  },
];
