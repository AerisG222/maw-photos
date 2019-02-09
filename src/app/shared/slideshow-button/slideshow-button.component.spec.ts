import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowButtonComponent } from './slideshow-button.component';

describe('SlideshowButtonComponent', () => {
  let component: SlideshowButtonComponent;
  let fixture: ComponentFixture<SlideshowButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
