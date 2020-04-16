import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMetadataEditorComponent } from './sidebar-metadata-editor.component';

describe('SidebarMetadataEditorComponent', () => {
  let component: SidebarMetadataEditorComponent;
  let fixture: ComponentFixture<SidebarMetadataEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarMetadataEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMetadataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
