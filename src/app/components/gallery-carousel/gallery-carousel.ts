import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  QueryList,
  signal,
  untracked,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

export interface CarouselSlide {
  src: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
}

const DEFAULT_DURATION = 1500;

// Scroll alignment tuning.
const MOBILE_LEFT_OFFSET_REM = 1;
const DESKTOP_LEFT_OFFSET_REM = 4;


function remToPx(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
}

function leftOffsetPxForViewport(): number {
  // Based of tailwind sm
  const isDesktopLike = window.matchMedia('(min-width: 640px)').matches;
  return remToPx(isDesktopLike ? DESKTOP_LEFT_OFFSET_REM : MOBILE_LEFT_OFFSET_REM);
}

@Component({
  selector: 'app-gallery-carousel',
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './gallery-carousel.html',
  styleUrl: './gallery-carousel.css',
})
export class GalleryCarousel {
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('track', { static: true })
  private readonly track!: ElementRef<HTMLDivElement>;

  @ViewChildren('slideEl')
  private readonly slideEls!: QueryList<ElementRef<HTMLElement>>;

  readonly slides = input.required<CarouselSlide[]>();
  readonly slideInterval = input<number>(DEFAULT_DURATION);
  readonly autoplay = input<boolean>(true);

  readonly currentIndexChange = output<number>();

  currentSlide = signal(0);
  isPaused = signal(false);

  private autoplaySub: Subscription | null = null;

  constructor() {
    // Clamp Slides effect
    effect(() => {
      const current = this.currentSlide();
      const clamped = this.clampSlides(current);

      if (clamped !== current) {
        this.currentSlide.set(clamped);
        this.currentIndexChange.emit(clamped);
      }
    });

    // Keep the active slide left.
    // With variable-size slides (natural image sizing), we should not rely on a post-width-transition
    // realignment delay; instead, scroll once after the DOM/query list is ready.
    effect(() => {
      const index = this.currentSlide();

      const length = this.slides().length;
      if (length === 0) return;

      queueMicrotask(() => {
        const trackEl = this.track?.nativeElement;
        const el = this.slideEls?.get(index)?.nativeElement;

        if (!trackEl || !el) return;

        const offsetPx = leftOffsetPxForViewport();
        const left = Math.max(0, el.offsetLeft - offsetPx);
        trackEl.scrollTo({ left, behavior: 'smooth' });
      });
    });

    effect((onCleanup) => {
      const enabled = this.autoplay();
      const ms = this.slideInterval();
      const paused = this.isPaused();
      const length = this.slides().length;

      this.stopAutoplay();

      if (!enabled || paused || length <= 1) return;

      // assert safe timer numbers
      const safeMs = Number.isFinite(ms) ? Math.max(1, ms) : DEFAULT_DURATION;

      this.autoplaySub = interval(safeMs).subscribe(() => {
        // used untracked because `next()` was creating effect dependencies
        untracked(() => this.next());
      });

      onCleanup(() => this.stopAutoplay());
    });

    // finally
    this.destroyRef.onDestroy(() => this.stopAutoplay());
  }

  private stopAutoplay() {
    this.autoplaySub?.unsubscribe();
    this.autoplaySub = null;
  }

  setCurrent(index: number) {
    const clamped = this.clampSlides(index);
    this.currentSlide.set(clamped);
    this.currentIndexChange.emit(clamped);
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

    const nextIndex = (this.currentSlide() + 1) % slides.length;
    this.currentSlide.set(nextIndex);
    this.currentIndexChange.emit(nextIndex);
  }
}
