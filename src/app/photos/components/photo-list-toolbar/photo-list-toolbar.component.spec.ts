import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListToolbarComponent } from './photo-list-toolbar.component';

describe('PhotoListMiniSettingsComponent', () => {
  let component: PhotoListToolbarComponent;
  let fixture: ComponentFixture<PhotoListToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoListToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
