import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourStay } from './your-stay';

describe('YourStay', () => {
  let component: YourStay;
  let fixture: ComponentFixture<YourStay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourStay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourStay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
