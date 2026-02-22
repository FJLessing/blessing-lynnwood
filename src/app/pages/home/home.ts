import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryCarousel, CarouselSlide } from '../../components/gallery-carousel/gallery-carousel';
import { Amenity, AmenityItem } from '../../components/amenity/amenity';
import { Availability } from '../../components/availability/availability';
import { register } from 'swiper/element/bundle';

register();

export interface Review {
  rating: number;
  title: string;
  body: string;
  author: string;
  date: string;
}

export interface NearbyPlace {
  nameKey: string;
  image: string;
  bgColor?: string;
  link?: string;
}

@Component({
  selector: 'app-home',
  imports: [TranslateModule, GalleryCarousel, Amenity, Availability],
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  // Don't translate review content
  reviews: Review[] = [
    {
      rating: 5,
      title: 'Exceptional',
      body: 'reviews.items.exceptional',
      author: 'Laans',
      date: 'March 2025',
    },
    {
      rating: 5,
      title: 'Could not have asked for more',
      body: 'An exceptionally spacious and well-fitted-out apartment in an upmarket and secure residential area. I had a lovely stay with very hospitable hosts. Everything and more than I needed. Could not have asked for better!',
      author: 'Deon',
      date: 'March 2025',
    },
    {
      rating: 5,
      title: 'Superb',
      body: 'Baie lekker verblyf! Skoon, veilig en gerieflik.',
      author: 'Gert',
      date: 'August 2024',
    },
  ];

  nearbyPlaces: NearbyPlace[] = [
    {
      nameKey: 'nearby.locations.atterbury',
      image: 'assets/images/card/atterbury.webp',
      link: 'https://www.google.com/viewer/place?mid=/g/1hhh5cnhy&sa=X&ved=2ahUKEwjT9fOZ6e2SAxXC0AIHHWmsC8EQqdYPegYIAQgIEAI',
    },
    {
      nameKey: 'nearby.locations.lynnwoodBridge',
      image: 'assets/images/card/lynnwood-bridge.webp',
      link: 'https://lynnwoodbridge.co.za/',
    },
    {
      nameKey: 'nearby.locations.botanicalGardens',
      image: 'assets/images/card/pnbg.webp',
      link: 'https://www.google.com/viewer/place?mid=/m/04ljb3l&sa=X&ved=2ahUKEwjT9fOZ6e2SAxXC0AIHHWmsC8EQqdYPegYIAQgIEA0',
    },
    {
      nameKey: 'nearby.locations.csir',
      image: 'assets/images/card/csir.webp',
      link: 'https://www.csir.co.za/',
    },
    {
      nameKey: 'nearby.locations.laerskoolLynnwood',
      image: 'assets/images/card/laerskool-lynnwood.webp',
      link: 'https://www.lynnwoodlaer.co.za/',
    },
    {
      nameKey: 'nearby.locations.menloPark',
      image: 'assets/images/card/menlopark.webp',
      link: 'https://www.menlopark.co.za/',
    },
    {
      nameKey: 'nearby.locations.unionBuildings',
      image: 'assets/images/card/union-buildings.webp',
      link: 'https://www.thepresidency.gov.za/union-buildings',
    },
    {
      nameKey: 'nearby.locations.brooklynMall',
      image: 'assets/images/card/brooklyn.webp',
      bgColor: 'bg-black',
      link: 'https://www.brooklynmall.co.za/',
    },
    {
      nameKey: 'nearby.locations.menlynMall',
      image: 'assets/images/card/menlyn.webp',
      link: 'https://www.menlynpark.co.za/',
    },
    {
      nameKey: 'nearby.locations.voortrekkerMonument',
      image: 'assets/images/card/voortrekker-monument.webp',
      bgColor: 'bg-[#25404d]',
      link: 'https://vtm.org.za/en/home/',
    },
    {
      nameKey: 'nearby.locations.timesSquare',
      image: 'assets/images/card/time-square.webp',
      link: 'https://www.suninternational.com/time-square/sunbet-arena/',
    },
    {
      nameKey: 'nearby.locations.universityOfPretoria',
      image: 'assets/images/card/university-of-pretoria.webp',
      link: 'https://www.up.ac.za/',
    },
    {
      nameKey: 'nearby.locations.loftusPark',
      image: 'assets/images/card/loftus-park.webp',
      link: 'https://loftuspark.co.za/',
    },
    {
      nameKey: 'nearby.locations.glenfairBoulevard',
      image: 'assets/images/card/glenfair-boulevard.webp',
      link: 'https://www.shopglenfairboulevard.co.za/',
    },
    {
      nameKey: 'nearby.locations.pretoriaCountryClub',
      image: 'assets/images/card/pcc.webp',
      link: 'https://ptacc.co.za/',
    },
  ];
}
