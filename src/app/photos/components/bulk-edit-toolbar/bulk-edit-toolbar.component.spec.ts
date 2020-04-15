import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEditToolbarComponent } from './bulk-edit-toolbar.component';

describe('BulkEditToolbarComponent', () => {
  let component: BulkEditToolbarComponent;
  let fixture: ComponentFixture<BulkEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkEditToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEditToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
