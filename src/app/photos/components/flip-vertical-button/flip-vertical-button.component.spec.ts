import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipVerticalButtonComponent } from './flip-vertical-button.component';

describe('FlipVerticalButtonComponent', () => {
  let component: FlipVerticalButtonComponent;
  let fixture: ComponentFixture<FlipVerticalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipVerticalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipVerticalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
