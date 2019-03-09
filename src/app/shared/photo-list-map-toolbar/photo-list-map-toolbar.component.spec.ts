import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListMapToolbarComponent } from './photo-list-map-toolbar.component';

describe('PhotoListMapToolbarComponent', () => {
  let component: PhotoListMapToolbarComponent;
  let fixture: ComponentFixture<PhotoListMapToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoListMapToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListMapToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
