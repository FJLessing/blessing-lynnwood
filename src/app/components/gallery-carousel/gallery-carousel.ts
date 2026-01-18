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
        0: { slidesOffsetBefore: 16, slidesOffsetAfter: 16 },
        640: { slidesOffsetBefore: 64, slidesOffsetAfter: 64 },
      },
      on: {
        slideChange: (swiper: Swiper) => {
          this.currentSlide.set(swiper.activeIndex);
          this.currentIndexChange.emit(swiper.activeIndex);
        },
      },
    };

    Object.assign(el, swiperParams);
    el.initialize();
    this.swiperInstance = el.swiper;
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
