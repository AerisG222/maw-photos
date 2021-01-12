import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryMissingGpsFilterComponent } from './category-missing-gps-filter.component';

describe('CategoryMissingGpsFilterComponent', () => {
  let component: CategoryMissingGpsFilterComponent;
  let fixture: ComponentFixture<CategoryMissingGpsFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMissingGpsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMissingGpsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
