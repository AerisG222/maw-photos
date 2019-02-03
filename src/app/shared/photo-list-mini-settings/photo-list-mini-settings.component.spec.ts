import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListMiniSettingsComponent } from './photo-list-mini-settings.component';

describe('PhotoListMiniSettingsComponent', () => {
  let component: PhotoListMiniSettingsComponent;
  let fixture: ComponentFixture<PhotoListMiniSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoListMiniSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListMiniSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
