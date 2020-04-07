import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarLinkComponent } from './toolbar-link.component';

describe('ToolbarLinkComponent', () => {
  let component: ToolbarLinkComponent;
  let fixture: ComponentFixture<ToolbarLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
