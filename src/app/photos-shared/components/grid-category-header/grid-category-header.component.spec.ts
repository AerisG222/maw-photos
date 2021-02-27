import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCategoryHeaderComponent } from './grid-category-header.component';

describe('GridCategoryHeaderComponent', () => {
  let component: GridCategoryHeaderComponent;
  let fixture: ComponentFixture<GridCategoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCategoryHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCategoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
