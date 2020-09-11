import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarRatingComponent } from './sidebar-rating.component';

describe('SidebarRatingComponent', () => {
  let component: SidebarRatingComponent;
  let fixture: ComponentFixture<SidebarRatingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
