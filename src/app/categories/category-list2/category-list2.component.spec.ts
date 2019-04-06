import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryList2Component } from './category-list2.component';

describe('CategoryList2Component', () => {
  let component: CategoryList2Component;
  let fixture: ComponentFixture<CategoryList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
