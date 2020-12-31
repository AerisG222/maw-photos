import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarMinimapComponent } from './sidebar-minimap.component';

describe('SidebarMinimapComponent', () => {
  let component: SidebarMinimapComponent;
  let fixture: ComponentFixture<SidebarMinimapComponent>;

  beforeEach(waitForAsync(() => {
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
