import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCardGroupComponent } from './sidebar-card-group.component';

describe('SidebarCardGroupComponent', () => {
  let component: SidebarCardGroupComponent;
  let fixture: ComponentFixture<SidebarCardGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCardGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
