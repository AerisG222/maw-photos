import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarCommentsComponent } from './sidebar-comments.component';

describe('SidebarCommentsComponent', () => {
  let component: SidebarCommentsComponent;
  let fixture: ComponentFixture<SidebarCommentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
