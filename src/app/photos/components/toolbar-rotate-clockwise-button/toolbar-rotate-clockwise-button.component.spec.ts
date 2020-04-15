import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarRotateClockwiseButtonComponent } from './toolbar-rotate-clockwise-button.component';

describe('ToolbarRotateClockwiseButtonComponent', () => {
  let component: ToolbarRotateClockwiseButtonComponent;
  let fixture: ComponentFixture<ToolbarRotateClockwiseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarRotateClockwiseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarRotateClockwiseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
