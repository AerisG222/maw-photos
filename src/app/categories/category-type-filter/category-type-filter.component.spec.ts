import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTypeFilterComponent } from './category-type-filter.component';

describe('CategoryTypeFilterComponent', () => {
  let component: CategoryTypeFilterComponent;
  let fixture: ComponentFixture<CategoryTypeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTypeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
