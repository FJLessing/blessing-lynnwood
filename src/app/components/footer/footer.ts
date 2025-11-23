import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule],
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
