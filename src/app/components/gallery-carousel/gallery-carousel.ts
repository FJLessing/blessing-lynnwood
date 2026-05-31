import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { register } from 'swiper/element/bundle';
import type { Swiper } from 'swiper/types';

register();

export interface CarouselSlide {
  src: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-gallery-carousel',
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './gallery-carousel.html',
  styleUrl: './gallery-carousel.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryCarousel implements AfterViewInit {
  @ViewChild('swiperEl') swiperEl!: ElementRef;

  readonly slides = input.required<CarouselSlide[]>();
  readonly slideInterval = input<number>(3000);
  readonly autoplay = input<boolean>(true);

  readonly currentIndexChange = output<number>();

  currentSlide = signal(0);

  private swiperInstance: Swiper | null = null;

  ngAfterViewInit() {
    const el = this.swiperEl?.nativeElement;
    if (!el) return;

    // Configure Swiper after view init
    const swiperParams = {
      slidesPerView: 'auto' as const,
      spaceBetween: 24,
      centeredSlides: false,
      grabCursor: true,
      keyboard: { enabled: true },
      autoplay: this.autoplay()
        ? { delay: this.slideInterval(), disableOnInteraction: true }
        : false,
      breakpoints: {
        0: { slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
        640: { slidesOffsetBefore: 12, slidesOffsetAfter: 0 },
      },
      observer: true,
      observeSlideChildren: true,
      resizeObserver: true,
      on: {
        slideChange: (swiper: Swiper) => {
          // Only update the signal if the index actually changed (prevents
          // focusSlide + slideTo from fighting over the same index).
          if (swiper.activeIndex !== this.currentSlide()) {
            this.currentSlide.set(swiper.activeIndex);
            this.currentIndexChange.emit(swiper.activeIndex);
          }
          this.reflowDuringExpand(swiper.activeIndex);
        },
      },
    };

    Object.assign(el, swiperParams);
    el.initialize();
    this.swiperInstance = el.swiper;
  }

  focusSlide(index: number) {
    // Set focus state directly so the clicked card expands immediately,
    // regardless of how Swiper resolves activeIndex with variable widths.
    this.currentSlide.set(index);
    this.currentIndexChange.emit(index);
    this.swiperInstance?.autoplay?.stop();
    // Smooth scroll to the clicked slide, matching the CSS width transition
    // duration (300 ms) so the scroll and the expand stay in sync.
    this.swiperInstance?.slideTo(index, 300);
    this.reflowDuringExpand(index);
  }

  /**
   * The active slide animates its width (collapsed spine -> full). Swiper caches
   * slide sizes/positions for `slidesPerView: 'auto'`, so without recalculating
   * the expanded card overflows and gets clipped by its neighbours. Recompute the
   * layout each frame for the duration of the CSS width transition.
   */
  private reflowDuringExpand(index: number) {
    const swiper = this.swiperInstance;
    if (!swiper) return;

    const duration = 320; // CSS transition is 300ms + small buffer
    const start = performance.now();

    const step = (now: number) => {
      if (!this.swiperInstance) return;
      this.swiperInstance.update();
      if (now - start < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  next() {
    this.swiperInstance?.slideNext();
  }

  pause() {
    this.swiperInstance?.autoplay?.stop();
  }

  resume() {
    if (this.autoplay()) {
      this.swiperInstance?.autoplay?.start();
    }
  }
}
