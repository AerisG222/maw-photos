import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFullscreenControlComponent } from './photo-fullscreen-control.component';

describe('PhotoFullscreenControlComponent', () => {
  let component: PhotoFullscreenControlComponent;
  let fixture: ComponentFixture<PhotoFullscreenControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoFullscreenControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFullscreenControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
