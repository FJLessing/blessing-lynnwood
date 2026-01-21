import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private translate = inject(TranslateService);
  currentLanguage = this.translate.currentLang || 'en';

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }
}
