import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoViewBulkEditComponent } from './photo-view-bulk-edit.component';

describe('PhotoViewBulkEditComponent', () => {
  let component: PhotoViewBulkEditComponent;
  let fixture: ComponentFixture<PhotoViewBulkEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoViewBulkEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoViewBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
