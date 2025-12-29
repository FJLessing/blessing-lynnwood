import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, effect, inject, input, output, signal, untracked } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

export interface CarouselSlide {
  src: string;
  alt: string;
  title?: string;
}

@Component({
  selector: 'app-gallery-carousel',
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './gallery-carousel.html',
  styleUrl: './gallery-carousel.css',
})
export class GalleryCarousel {
  private readonly destroyRef = inject(DestroyRef);


  readonly slides = input.required<CarouselSlide[]>();
  readonly slideInterval = input<number>(500);
  readonly autoplay = input<boolean>(true);

  readonly currentIndexChange = output<number>();

  currentSlide = signal(0);
  isPaused = signal(false);

  private autoplaySub: Subscription | null = null;

  constructor() {
    // Clamp Slides effect.
    effect(() => {
      const slides = this.slides();
      const current = this.currentSlide();

      const clamped = this.clampSlides(current);
      if (clamped !== current) {
        this.currentSlide.set(clamped);
        this.currentIndexChange.emit(clamped);
      }
    })

    // Autoplay
    effect((onCleanup) => {
      const enabled = this.autoplay();
      const ms = this.slideInterval();
      const paused = this.isPaused();
      const length = this.slides().length;

      this.stopAutoplay();

      if (!enabled || paused || length <= 1) return;

      // assert safe timer numbers
      const safeMs = Number.isFinite(ms) ? Math.max(0, ms) : 500;

      this.autoplaySub = interval(safeMs).subscribe(() => {
        // used untracked because `next()` was creating effect dependencies
        untracked(() => this.next());
      })

      onCleanup(() => this.stopAutoplay);
    })

    // finally
    this.destroyRef.onDestroy(() => this.stopAutoplay());
  }

  stopAutoplay() {
    this.autoplaySub?.unsubscribe();
    this.autoplaySub = null;
  }

  setCurrent(index: number) {
    this.currentSlide.set(this.clampSlides(index));
    this.currentIndexChange.emit(index);
  }

  clampSlides(index: number): number {
    const slides = this.slides();
    if (slides.length === 0) return 0;
    return Math.max(0, Math.min(index, slides.length - 1));
  }

  pause() {
    this.isPaused.set(true);
  }

  resume() {
    this.isPaused.set(false);
  }

  next() {
    const slides = this.slides();
    if (slides.length === 0) return;

    this.currentSlide.set((this.currentSlide() + 1) % slides.length);
  }
}
function rxInterval(safeMs: number): Subscription | null {
  throw new Error('Function not implemented.');
}
