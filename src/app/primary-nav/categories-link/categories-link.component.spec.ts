import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriesLinkComponent } from './categories-link.component';

describe('CategoriesLinkComponent', () => {
  let component: CategoriesLinkComponent;
  let fixture: ComponentFixture<CategoriesLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
