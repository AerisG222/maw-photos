import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotateCounterClockwiseButtonComponent } from './rotate-counter-clockwise-button.component';

describe('RotateCounterClockwiseButtonComponent', () => {
  let component: RotateCounterClockwiseButtonComponent;
  let fixture: ComponentFixture<RotateCounterClockwiseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotateCounterClockwiseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotateCounterClockwiseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
