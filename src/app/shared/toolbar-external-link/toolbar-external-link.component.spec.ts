import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarExternalLinkComponent } from './toolbar-external-link.component';

describe('ToolbarExternalLinkComponent', () => {
  let component: ToolbarExternalLinkComponent;
  let fixture: ComponentFixture<ToolbarExternalLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarExternalLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarExternalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
