import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

export interface AmenityItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-amenity',
  imports: [TranslateModule],
  templateUrl: './amenity.html',
  styleUrl: './amenity.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-col justify-center items-center p-8 bg-sage-40 rounded-lg text-white w-full md:w-[25.75rem] h-[12.375rem]',
  },
})
export class Amenity {
  icon = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
}
