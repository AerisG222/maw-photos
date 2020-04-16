import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCategoryTeaserChooserComponent } from './sidebar-category-teaser-chooser.component';

describe('SidebarCategoryTeaserChooserComponent', () => {
  let component: SidebarCategoryTeaserChooserComponent;
  let fixture: ComponentFixture<SidebarCategoryTeaserChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCategoryTeaserChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCategoryTeaserChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
