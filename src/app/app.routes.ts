import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { YourStay } from './pages/your-stay/your-stay';
import { ContactUs } from './pages/contact-us/contact-us';
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
  // Everything else goes to:
  {
    path: '**',
    component: NotFound,
  },
];
