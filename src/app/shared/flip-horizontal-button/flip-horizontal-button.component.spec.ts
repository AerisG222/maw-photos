import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipHorizontalButtonComponent } from './flip-horizontal-button.component';

describe('FlipHorizontalButtonComponent', () => {
  let component: FlipHorizontalButtonComponent;
  let fixture: ComponentFixture<FlipHorizontalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipHorizontalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipHorizontalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
