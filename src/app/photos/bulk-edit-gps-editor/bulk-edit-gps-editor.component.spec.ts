import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEditGpsEditorComponent } from './bulk-edit-gps-editor.component';

describe('BulkEditGpsEditorComponent', () => {
  let component: BulkEditGpsEditorComponent;
  let fixture: ComponentFixture<BulkEditGpsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEditGpsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEditGpsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
