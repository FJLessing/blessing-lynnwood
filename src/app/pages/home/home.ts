import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryCarousel, CarouselSlide } from '../../components/gallery-carousel/gallery-carousel';
import { Amenity, AmenityItem } from '../../components/amenity/amenity';
import { Availability } from '../../components/availability/availability';
import { Reviews } from '../../components/reviews/reviews';
import { Nearby } from '../../components/nearby/nearby';

@Component({
  selector: 'app-home',
  imports: [TranslateModule, GalleryCarousel, Amenity, Availability, Reviews, Nearby],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  carouselImages: CarouselSlide[] = [
    {
      src: 'assets/images/gallery/0. Home Entrance.webp',
      alt: 'Home Entrance',
      title: 'Home Entrance',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/1. Street view entrance.webp',
      alt: 'Street view entrance',
      title: 'Street view entrance',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/2. Entrance Gate.webp',
      alt: 'Entrance Gate',
      title: 'Entrance Gate',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/3. Property overall view.webp',
      alt: 'Property overall view',
      title: 'Property overall view',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/4. Property other angle.webp',
      alt: 'Property other angle',
      title: 'Property other angle',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/5. Parking and entrance.webp',
      alt: 'Parking and entrance',
      title: 'Parking and entrance',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/6. Entrance from parking.webp',
      alt: 'Entrance from parking',
      title: 'Entrance from parking',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/7. Stairs to entrance.webp',
      alt: 'Stairs to entrance',
      title: 'Stairs to entrance',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/8. Security gate entrance.webp',
      alt: 'Security gate entrance',
      title: 'Security gate entrance',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/9. Living room entrance view.webp',
      alt: 'Living room entrance view',
      title: 'Living room entrance view',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/10. Living room seating.webp',
      alt: 'Living room seating',
      title: 'Living room seating',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/11. Living room seated view.webp',
      alt: 'Living room seated view',
      title: 'Living room seated view',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/12. Mazzanine living room.webp',
      alt: 'Mazzanine living room',
      title: 'Mazzanine living room',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/13. Bedroom entrance view.webp',
      alt: 'Bedroom entrance view',
      title: 'Bedroom entrance view',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/14. Bedroom view from bed.webp',
      alt: 'Bedroom view from bed',
      title: 'Bedroom view from bed',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/15. Bedroom other view.webp',
      alt: 'Bedroom other view',
      title: 'Bedroom other view',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/15.5 Bedroom Night View.webp',
      alt: 'Bedroom Night View',
      title: 'Bedroom Night View',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/16. Kitchenette overall view.webp',
      alt: 'Kitchenette overall view',
      title: 'Kitchenette overall view',
      width: 2160,
      height: 1620,
    },
    {
      src: 'assets/images/gallery/17. Kitchenette entrance view.webp',
      alt: 'Kitchenette entrance view',
      title: 'Kitchenette entrance view',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/18. Kitchenette fridge and freezer.webp',
      alt: 'Kitchenette fridge and freezer',
      title: 'Kitchenette fridge and freezer',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/19. Bathroom & shower.webp',
      alt: 'Bathroom & shower',
      title: 'Bathroom & shower',
      width: 1620,
      height: 2160,
    },
    {
      src: 'assets/images/gallery/20. Private toilet.webp',
      alt: 'Private toilet',
      title: 'Private toilet',
      width: 1620,
      height: 2160,
    },
  ];

  amenities: AmenityItem[] = [
    {
      icon: 'kitchen-knife',
      title: 'amenities.kitchenette.title',
      description: 'amenities.kitchenette.description',
    },
    {
      icon: 'desktop',
      title: 'amenities.entertainment.title',
      description: 'amenities.entertainment.description',
    },
    {
      icon: 'clinic',
      title: 'amenities.apartment.title',
      description: 'amenities.apartment.description',
    },
    {
      icon: 'wifi',
      title: 'amenities.wifi.title',
      description: 'amenities.wifi.description',
    },
    {
      icon: 'braai',
      title: 'amenities.barbeque.title',
      description: 'amenities.barbeque.description',
    },
    {
      icon: 'car',
      title: 'amenities.parking.title',
      description: 'amenities.parking.description',
    },
  ];
}
