import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import ICAL from 'ical.js';

interface DayObj {
  date: Date;
  isBooked: boolean;
  isPadding: boolean;
  dayNum: number;
}

@Component({
  selector: 'app-availability',
  imports: [DatePipe, TranslateModule],
  templateUrl: './availability.html',
  styleUrl: './availability.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Availability implements OnInit {
  readonly currentDate = signal(new Date());
  readonly daysInMonth = signal<DayObj[]>([]);
  readonly bookedRanges = signal<{ start: Date; end: Date }[]>([]);
  readonly weekdays = [
    'booking.calendar.days.sun',
    'booking.calendar.days.mon',
    'booking.calendar.days.tue',
    'booking.calendar.days.wed',
    'booking.calendar.days.thu',
    'booking.calendar.days.fri',
    'booking.calendar.days.sat',
  ];
  readonly checkIn = signal<Date | null>(null);
  readonly checkOut = signal<Date | null>(null);

  readonly bookingUrl = computed(() => {
    const baseUrl = 'https://www.booking.com/hotel/za/myblessing-apartment-guest-rooms.en-gb.html';
    const checkIn = this.checkIn();
    const checkOut = this.checkOut();

    // Booking.com uses semicolons as parameter separators
    const params: string[] = [];

    if (checkIn) {
      params.push(`checkin=${this.formatDate(checkIn)}`);
    }
    if (checkOut) {
      params.push(`checkout=${this.formatDate(checkOut)}`);
    }

    return params.length > 0 ? `${baseUrl}?${params.join(';')}` : baseUrl;
  });

  private iCalUrl = 'https://blessing.fjlessing.co.za/ical/';
  private http = inject(HttpClient);

  ngOnInit() {
    this.fetchAvailability();
  }

  fetchAvailability() {
    this.http.get(this.iCalUrl, { responseType: 'text' }).subscribe((data) => {
      this.parseICal(data);
      this.generateCalendar();
    });
  }

  parseICal(icalData: string) {
    if (!icalData?.trim()) {
      this.bookedRanges.set([]);
      return;
    }

    try {
      const jcalData = ICAL.parse(icalData);
      const comp = new ICAL.Component(jcalData);
      const events = comp.getAllSubcomponents('vevent') as ICAL.Component[];

      const ranges = events
        .map((event: ICAL.Component) => {
          const vevent = new ICAL.Event(event);
          const start = vevent.startDate?.toJSDate();
          const end = (vevent.endDate ?? vevent.startDate)?.toJSDate();

          if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
            return null;
          }

          return {
            start,
            end,
          };
        })
        .filter((range): range is { start: Date; end: Date } => Boolean(range));

      this.bookedRanges.set(ranges);
    } catch {
      this.bookedRanges.set([]);
    }
  }

  generateCalendar() {
    const currentDate = this.currentDate();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const calendarDays: DayObj[] = [];

    // Add padding days (empty slots before the 1st)
    // getDay() returns 0 for Sunday. If month starts on Tue (2), we need 2 empty slots.
    const startDayOfWeek = firstDay.getDay();
    for (let i = 0; i < startDayOfWeek; i++) {
      calendarDays.push({ date: null!, isBooked: false, isPadding: true, dayNum: 0 });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const current = new Date(year, month, i);
      calendarDays.push({
        date: current,
        dayNum: i,
        isBooked: this.checkIfBooked(current),
        isPadding: false,
      });
    }

    this.daysInMonth.set(calendarDays);
  }

  checkIfBooked(dateToCheck: Date): boolean {
    // Check if the date falls inside any of the booked ranges
    return this.bookedRanges().some(
      (range) => dateToCheck >= range.start && dateToCheck < range.end
    );
  }

  changeMonth(delta: number) {
    const currentDate = this.currentDate();
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1);
    this.currentDate.set(nextDate);
    this.generateCalendar();
  }

  onDayClick(day: DayObj) {
    if (day.isPadding || day.isBooked || !day.date) {
      return;
    }

    const checkIn = this.checkIn();
    const checkOut = this.checkOut();

    if (!checkIn || (checkIn && checkOut)) {
      this.checkIn.set(day.date);
      this.checkOut.set(null);
      return;
    }

    if (day.date <= checkIn) {
      this.checkIn.set(day.date);
      this.checkOut.set(null);
      return;
    }

    if (this.hasBookedInRange(checkIn, day.date)) {
      return;
    }

    this.checkOut.set(day.date);
  }

  isSelectedStart(day: DayObj): boolean {
    const checkIn = this.checkIn();
    return Boolean(checkIn && day.date && this.isSameDate(day.date, checkIn));
  }

  isSelectedEnd(day: DayObj): boolean {
    const checkOut = this.checkOut();
    return Boolean(checkOut && day.date && this.isSameDate(day.date, checkOut));
  }

  isInRange(day: DayObj): boolean {
    const checkIn = this.checkIn();
    const checkOut = this.checkOut();

    if (!checkIn || !checkOut || !day.date) {
      return false;
    }

    return day.date > checkIn && day.date < checkOut;
  }

  private isSameDate(left: Date, right: Date): boolean {
    return (
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate()
    );
  }

  private hasBookedInRange(start: Date, end: Date): boolean {
    return this.daysInMonth().some((day) => {
      if (!day.date || day.isPadding) {
        return false;
      }

      if (day.date <= start || day.date >= end) {
        return false;
      }

      return day.isBooked;
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
