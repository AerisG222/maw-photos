import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMovePreviousButtonComponent } from './toolbar-move-previous-button.component';

describe('ToolbarMovePreviousButtonComponent', () => {
  let component: ToolbarMovePreviousButtonComponent;
  let fixture: ComponentFixture<ToolbarMovePreviousButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarMovePreviousButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMovePreviousButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
