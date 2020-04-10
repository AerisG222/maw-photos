import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoViewFullscreenComponent } from './photo-view-fullscreen.component';

describe('PhotoViewFullscreenComponent', () => {
  let component: PhotoViewFullscreenComponent;
  let fixture: ComponentFixture<PhotoViewFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoViewFullscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoViewFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
