import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  private translate = inject(TranslateService);
  currentLanguage = this.translate.currentLang || 'en';

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }
}
