import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePreviousButtonComponent } from './move-previous-button.component';

describe('MovePreviousButtonComponent', () => {
  let component: MovePreviousButtonComponent;
  let fixture: ComponentFixture<MovePreviousButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovePreviousButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePreviousButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
