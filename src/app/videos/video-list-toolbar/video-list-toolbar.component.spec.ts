import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListToolbarComponent } from './video-list-toolbar.component';

describe('VideoListToolbarComponent', () => {
  let component: VideoListToolbarComponent;
  let fixture: ComponentFixture<VideoListToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoListToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
