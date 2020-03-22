import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCardDividerComponent } from './sidebar-card-divider.component';

describe('SidebarCardDividerComponent', () => {
  let component: SidebarCardDividerComponent;
  let fixture: ComponentFixture<SidebarCardDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCardDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCardDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
