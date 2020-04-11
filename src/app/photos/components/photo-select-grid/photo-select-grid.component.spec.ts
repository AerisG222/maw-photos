import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSelectGridComponent } from './photo-select-grid.component';

describe('PhotoSelectGridComponent', () => {
  let component: PhotoSelectGridComponent;
  let fixture: ComponentFixture<PhotoSelectGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoSelectGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSelectGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
