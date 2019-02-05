import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExifTableComponent } from './exif-table.component';

describe('ExifTableComponent', () => {
  let component: ExifTableComponent;
  let fixture: ComponentFixture<ExifTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExifTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExifTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
