import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarButtonGroupComponent } from './sidebar-button-group.component';

describe('SidebarButtonGroupComponent', () => {
  let component: SidebarButtonGroupComponent;
  let fixture: ComponentFixture<SidebarButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarButtonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
