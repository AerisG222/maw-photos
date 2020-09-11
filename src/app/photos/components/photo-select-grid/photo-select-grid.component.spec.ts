import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhotoSelectGridComponent } from './photo-select-grid.component';

describe('PhotoSelectGridComponent', () => {
  let component: PhotoSelectGridComponent;
  let fixture: ComponentFixture<PhotoSelectGridComponent>;

  beforeEach(waitForAsync(() => {
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
