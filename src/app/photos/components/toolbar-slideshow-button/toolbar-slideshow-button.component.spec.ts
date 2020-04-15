import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSlideshowButtonComponent } from './toolbar-slideshow-button.component';

describe('ToolbarSlideshowButtonComponent', () => {
  let component: ToolbarSlideshowButtonComponent;
  let fixture: ComponentFixture<ToolbarSlideshowButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarSlideshowButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarSlideshowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
