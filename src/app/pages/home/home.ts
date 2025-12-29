import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryCarousel, CarouselSlide } from '../../components/gallery-carousel/gallery-carousel';

@Component({
  selector: 'app-home',
  imports: [TranslateModule, GalleryCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  carouselImages: CarouselSlide[] = [
    { src: 'assets/images/gallery/0. Home Entrance.webp', alt: 'Home Entrance', title: 'Home Entrance' },
    { src: 'assets/images/gallery/1. Street view entrance.webp', alt: 'Street view entrance', title: 'Street view entrance' },
    { src: 'assets/images/gallery/2. Entrance Gate.webp', alt: 'Entrance Gate', title: 'Entrance Gate' },
    { src: 'assets/images/gallery/3. Property overall view.webp', alt: 'Property overall view', title: 'Property overall view' },
    { src: 'assets/images/gallery/4. Property other angle.webp', alt: 'Property other angle', title: 'Property other angle' },
    { src: 'assets/images/gallery/5. Parking and entrance.webp', alt: 'Parking and entrance', title: 'Parking and entrance' },
    { src: 'assets/images/gallery/6. Entrance from parking.webp', alt: 'Entrance from parking', title: 'Entrance from parking' },
    { src: 'assets/images/gallery/7. Stairs to entrance.webp', alt: 'Stairs to entrance', title: 'Stairs to entrance' },
    { src: 'assets/images/gallery/8. Security gate entrance.webp', alt: 'Security gate entrance', title: 'Security gate entrance' },
    { src: 'assets/images/gallery/9. Living room entrance view.webp', alt: 'Living room entrance view', title: 'Living room entrance view' },
    { src: 'assets/images/gallery/10. Living room seating.webp', alt: 'Living room seating', title: 'Living room seating' },
    { src: 'assets/images/gallery/11. Living room seated view.webp', alt: 'Living room seated view', title: 'Living room seated view' },
    { src: 'assets/images/gallery/12. Mazzanine living room.webp', alt: 'Mazzanine living room', title: 'Mazzanine living room' },
    { src: 'assets/images/gallery/13. Bedroom entrance view.webp', alt: 'Bedroom entrance view', title: 'Bedroom entrance view' },
    { src: 'assets/images/gallery/14. Bedroom view from bed.webp', alt: 'Bedroom view from bed', title: 'Bedroom view from bed' },
    { src: 'assets/images/gallery/15. Bedroom other view.webp', alt: 'Bedroom other view', title: 'Bedroom other view' },
    { src: 'assets/images/gallery/15.5 Bedroom Night View.webp', alt: 'Bedroom Night View', title: 'Bedroom Night View' },
    { src: 'assets/images/gallery/16. Kitchenette overall view.webp', alt: 'Kitchenette overall view', title: 'Kitchenette overall view' },
    { src: 'assets/images/gallery/17. Kitchenette entrance view.webp', alt: 'Kitchenette entrance view', title: 'Kitchenette entrance view' },
    { src: 'assets/images/gallery/18. Kitchenette fridge and freezer.webp', alt: 'Kitchenette fridge and freezer', title: 'Kitchenette fridge and freezer' },
    { src: 'assets/images/gallery/19. Bathroom & shower.webp', alt: 'Bathroom & shower', title: 'Bathroom & shower' },
    { src: 'assets/images/gallery/20. Private toilet.webp', alt: 'Private toilet', title: 'Private toilet' },
  ];
}
