import { Component, inject } from '@angular/core';
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
export class YourStay {
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

  googleMapsUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed/v1/place?key=AIzaSyBC1_4waw1Q--XyOzF_vUAXTnm7stzLJdQ&q=358+Elizabeth+Grove+South,+Pretoria,+South+Africa,+0081',
  );
}
