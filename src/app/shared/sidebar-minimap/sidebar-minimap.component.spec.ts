import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMinimapComponent } from './sidebar-minimap.component';

describe('SidebarMinimapComponent', () => {
  let component: SidebarMinimapComponent;
  let fixture: ComponentFixture<SidebarMinimapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarMinimapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMinimapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
