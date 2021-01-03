import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarViewDetailButtonComponent } from './toolbar-view-detail-button.component';

describe('ToolbarViewDetailButtonComponent', () => {
  let component: ToolbarViewDetailButtonComponent;
  let fixture: ComponentFixture<ToolbarViewDetailButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarViewDetailButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarViewDetailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
