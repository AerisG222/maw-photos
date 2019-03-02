import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInfoPanelComponent } from './video-info-panel.component';

describe('VideoInfoPanelComponent', () => {
  let component: VideoInfoPanelComponent;
  let fixture: ComponentFixture<VideoInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
