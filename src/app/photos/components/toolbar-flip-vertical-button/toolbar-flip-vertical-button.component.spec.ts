import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarFlipVerticalButtonComponent } from './toolbar-flip-vertical-button.component';

describe('ToolbarFlipVerticalButtonComponent', () => {
  let component: ToolbarFlipVerticalButtonComponent;
  let fixture: ComponentFixture<ToolbarFlipVerticalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarFlipVerticalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarFlipVerticalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
