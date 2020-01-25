import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListToolbarComponent } from './category-list-toolbar.component';

describe('CategoryListMiniSettingsComponent', () => {
  let component: CategoryListToolbarComponent;
  let fixture: ComponentFixture<CategoryListToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
