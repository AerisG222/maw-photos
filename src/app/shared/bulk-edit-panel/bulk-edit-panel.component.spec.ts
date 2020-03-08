import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEditPanelComponent } from './bulk-edit-panel.component';

describe('BulkEditPanelComponent', () => {
  let component: BulkEditPanelComponent;
  let fixture: ComponentFixture<BulkEditPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEditPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
