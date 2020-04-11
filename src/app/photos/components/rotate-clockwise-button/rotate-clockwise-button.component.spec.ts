import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotateClockwiseButtonComponent } from './rotate-clockwise-button.component';

describe('RotateClockwiseButtonComponent', () => {
  let component: RotateClockwiseButtonComponent;
  let fixture: ComponentFixture<RotateClockwiseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotateClockwiseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotateClockwiseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
