import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarLayoutComponent } from './toolbar-layout.component';

describe('ToolbarLayoutComponent', () => {
  let component: ToolbarLayoutComponent;
  let fixture: ComponentFixture<ToolbarLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
