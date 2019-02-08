import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListFullscreenToolbarComponent } from './photo-list-fullscreen-toolbar.component';

describe('PhotoFullscreenControlComponent', () => {
  let component: PhotoListFullscreenToolbarComponent;
  let fixture: ComponentFixture<PhotoListFullscreenToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoListFullscreenToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListFullscreenToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
