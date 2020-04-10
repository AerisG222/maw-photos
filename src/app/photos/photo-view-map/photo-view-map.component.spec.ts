import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoViewMapComponent } from './photo-view-map.component';

describe('PhotoViewMapComponent', () => {
  let component: PhotoViewMapComponent;
  let fixture: ComponentFixture<PhotoViewMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoViewMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoViewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
