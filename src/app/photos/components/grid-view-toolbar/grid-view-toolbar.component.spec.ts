import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewToolbarComponent } from './grid-view-toolbar.component';

describe('GridViewToolbarComponent', () => {
  let component: GridViewToolbarComponent;
  let fixture: ComponentFixture<GridViewToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridViewToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
