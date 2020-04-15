import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHistogramComponent } from './sidebar-histogram.component';

describe('SidebarHistogramComponent', () => {
  let component: SidebarHistogramComponent;
  let fixture: ComponentFixture<SidebarHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarHistogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
