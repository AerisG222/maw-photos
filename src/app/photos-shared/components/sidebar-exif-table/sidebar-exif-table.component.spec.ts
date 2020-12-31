import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarExifTableComponent } from './sidebar-exif-table.component';

describe('SidebarExifTableComponent', () => {
  let component: SidebarExifTableComponent;
  let fixture: ComponentFixture<SidebarExifTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarExifTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarExifTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
