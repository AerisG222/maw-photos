import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoInfoPanelComponent } from './photo-info-panel.component';

describe('PhotoInfoPanelComponent', () => {
  let component: PhotoInfoPanelComponent;
  let fixture: ComponentFixture<PhotoInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
