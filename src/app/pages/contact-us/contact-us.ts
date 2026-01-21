import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, FormsModule, TranslateModule, HttpClientModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUs {
  private http = inject(HttpClient);

  // Spam-protected contact details (split to avoid simple scrapers)
  private emailParts = ['divl', 'icon.co.za'];
  private phoneParts = ['+27', '12', '345', '6789'];
  readonly revealedEmail = signal(false);
  readonly revealedPhone = signal(false);
  readonly copyTarget = signal<string | null>(null);

  readonly formData = signal<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  readonly isSubmitting = signal(false);
  readonly submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  readonly errorMessage = signal('');

  updateField(field: keyof ContactFormData, value: string) {
    this.formData.update((data) => ({ ...data, [field]: value }));
  }

  onSubmit() {
    const data = this.formData();

    // Basic validation
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      this.errorMessage.set('Please fill in all required fields.');
      this.submitStatus.set('error');
      return;
    }

    if (!this.isValidEmail(data.email)) {
      this.errorMessage.set('Please enter a valid email address.');
      this.submitStatus.set('error');
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    this.http.post('/submission/index.php', data).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitStatus.set('success');
        this.formData.set({ name: '', email: '', phone: '', message: '' });
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.submitStatus.set('error');
        this.errorMessage.set('Failed to send message. Please try again later.');
        console.error('Contact form submission error:', error);
      },
    });
  }

  revealEmail() {
    this.revealedEmail.set(true);
  }

  revealPhone() {
    this.revealedPhone.set(true);
  }

  getEmail(): string {
    return `${this.emailParts[0]}@${this.emailParts[1]}`;
  }

  getPhone(): string {
    return this.phoneParts.join(' ');
  }

  getTelHref(): string {
    return 'tel:' + this.getPhone().replace(/\s+/g, '');
  }

  getMailtoHref(): string {
    return 'mailto:' + this.getEmail();
  }

  copyToClipboard(text: string, target?: string) {
    try {
      // navigator.clipboard may return a promise, ignore resolution
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }

    if (target) {
      this.copyTarget.set(target);
      setTimeout(() => this.copyTarget.set(null), 2000);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
