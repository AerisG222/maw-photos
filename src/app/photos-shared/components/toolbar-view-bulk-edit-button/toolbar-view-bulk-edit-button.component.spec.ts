import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarViewBulkEditButtonComponent } from './toolbar-view-bulk-edit-button.component';

describe('ToolbarViewBulkEditButtonComponent', () => {
  let component: ToolbarViewBulkEditButtonComponent;
  let fixture: ComponentFixture<ToolbarViewBulkEditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarViewBulkEditButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarViewBulkEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
