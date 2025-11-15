import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('blessing-lynnwood');
  private translate = inject(TranslateService);
  constructor() {
    this.translate.addLangs(['en', 'af']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }
}
