import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultSidebarComponent } from './default-sidebar.component';

describe('DefaultSidebarComponent', () => {
  let component: DefaultSidebarComponent;
  let fixture: ComponentFixture<DefaultSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
