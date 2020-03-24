import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarButtonDividerComponent } from './sidebar-button-divider.component';

describe('SidebarButtonDividerComponent', () => {
  let component: SidebarButtonDividerComponent;
  let fixture: ComponentFixture<SidebarButtonDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarButtonDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarButtonDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
