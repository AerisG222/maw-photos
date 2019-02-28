import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCategoryComponent } from './photo-category.component';

describe('CategoryComponent', () => {
  let component: PhotoCategoryComponent;
  let fixture: ComponentFixture<PhotoCategoryComponent>;

  beforeEach(async(() => {
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
