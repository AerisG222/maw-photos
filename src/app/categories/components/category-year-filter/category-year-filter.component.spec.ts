import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryYearFilterComponent } from './category-year-filter.component';

describe('CategoryYearFilterComponent', () => {
  let component: CategoryYearFilterComponent;
  let fixture: ComponentFixture<CategoryYearFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryYearFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryYearFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
