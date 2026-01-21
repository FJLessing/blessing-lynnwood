import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LastWordFancyPipe } from '../../pipes/last-word-fancy-pipe';

interface StayInfoItem {
  icon: string;
  translationKey: string;
  sameLine?: boolean;
}

@Component({
  selector: 'app-your-stay',
  imports: [TranslateModule, RouterLink, LastWordFancyPipe],
  templateUrl: './your-stay.html',
  styleUrl: './your-stay.css',
})
export class YourStay implements OnInit {
  private sanitizer = inject(DomSanitizer);

  infoItems: StayInfoItem[] = [
    { icon: 'time', translationKey: 'yourStay.info.checkIn', sameLine: true },
    { icon: 'time-five', translationKey: 'yourStay.info.checkOut', sameLine: true },
    { icon: 'alert-circle', translationKey: 'yourStay.info.cancellation' },
    { icon: 'users', translationKey: 'yourStay.info.childPolicies' },
    { icon: 'users', translationKey: 'yourStay.info.cotPolicies' },
    { icon: 'user', translationKey: 'yourStay.info.ageRestriction' },
    { icon: 'smoking-no', translationKey: 'yourStay.info.smoking' },
    { icon: 'cake', translationKey: 'yourStay.info.parties' },
    { icon: 'history', translationKey: 'yourStay.info.quietHours' },
    { icon: 'pet-paw', translationKey: 'yourStay.info.pets' },
  ];

  googleMapsUrl: SafeResourceUrl | null = null;

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch('/assets/env.json');
      if (!res.ok) return;
      const data = await res.json();
      const key = data.GOOGLE_MAPS_API_KEY;
      if (!key) return;
      this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps/embed/v1/place?key=${key}&q=358+Elizabeth+Grove+South,+Pretoria,+South+Africa,+0081`,
      );
    } catch {
      return;
    }
  }
}
