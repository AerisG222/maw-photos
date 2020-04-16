import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSidebarComponent } from './toolbar-sidebar.component';

describe('ToolbarSidebarComponent', () => {
  let component: ToolbarSidebarComponent;
  let fixture: ComponentFixture<ToolbarSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
