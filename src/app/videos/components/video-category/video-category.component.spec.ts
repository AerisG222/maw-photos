import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoCategoryComponent } from './video-category.component';

describe('VideoCategoryComponent', () => {
  let component: VideoCategoryComponent;
  let fixture: ComponentFixture<VideoCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
