import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMoveNextButtonComponent } from './toolbar-move-next-button.component';

describe('ToolbarMoveNextButtonComponent', () => {
  let component: ToolbarMoveNextButtonComponent;
  let fixture: ComponentFixture<ToolbarMoveNextButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarMoveNextButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMoveNextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
