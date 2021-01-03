import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarViewMapButtonComponent } from './toolbar-view-map-button.component';

describe('ToolbarViewMapButtonComponent', () => {
  let component: ToolbarViewMapButtonComponent;
  let fixture: ComponentFixture<ToolbarViewMapButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarViewMapButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarViewMapButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
