import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTeaserChooserComponent } from './category-teaser-chooser.component';

describe('CategoryTeaserChooserComponent', () => {
  let component: CategoryTeaserChooserComponent;
  let fixture: ComponentFixture<CategoryTeaserChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTeaserChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTeaserChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
