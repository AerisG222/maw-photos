import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSidebarLayoutComponent } from './toolbar-sidebar-layout.component';

describe('ToolbarSidebarLayoutComponent', () => {
  let component: ToolbarSidebarLayoutComponent;
  let fixture: ComponentFixture<ToolbarSidebarLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarSidebarLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
