import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailibilityCalendar } from './availibility-calendar';

describe('AvailibilityCalendar', () => {
  let component: AvailibilityCalendar;
  let fixture: ComponentFixture<AvailibilityCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailibilityCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailibilityCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
