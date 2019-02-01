import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListMiniSettingsComponent } from './category-list-mini-settings.component';

describe('CategoryListMiniSettingsComponent', () => {
  let component: CategoryListMiniSettingsComponent;
  let fixture: ComponentFixture<CategoryListMiniSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListMiniSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListMiniSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
