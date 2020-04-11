import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListBulkEditToolbarComponent } from './photo-list-bulk-edit-toolbar.component';

describe('PhotoListBulkEditToolbarComponent', () => {
  let component: PhotoListBulkEditToolbarComponent;
  let fixture: ComponentFixture<PhotoListBulkEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoListBulkEditToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListBulkEditToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
