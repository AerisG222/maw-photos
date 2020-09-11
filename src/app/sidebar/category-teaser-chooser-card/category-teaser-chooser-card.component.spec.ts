import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryTeaserChooserCardComponent } from './category-teaser-chooser-card.component';

describe('CategoryTeaserChooserCardComponent', () => {
  let component: CategoryTeaserChooserCardComponent;
  let fixture: ComponentFixture<CategoryTeaserChooserCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTeaserChooserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTeaserChooserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
