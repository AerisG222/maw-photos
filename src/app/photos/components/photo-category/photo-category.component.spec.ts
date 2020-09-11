import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhotoCategoryComponent } from './photo-category.component';

describe('PhotoCategoryComponent', () => {
  let component: PhotoCategoryComponent;
  let fixture: ComponentFixture<PhotoCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
