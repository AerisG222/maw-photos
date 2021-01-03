import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarGroupSelectViewComponent } from './toolbar-group-select-view.component';

describe('ToolbarGroupSelectViewComponent', () => {
  let component: ToolbarGroupSelectViewComponent;
  let fixture: ComponentFixture<ToolbarGroupSelectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarGroupSelectViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarGroupSelectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
