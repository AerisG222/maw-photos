import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveNextButtonComponent } from './move-next-button.component';

describe('MoveNextButtonComponent', () => {
  let component: MoveNextButtonComponent;
  let fixture: ComponentFixture<MoveNextButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveNextButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveNextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
