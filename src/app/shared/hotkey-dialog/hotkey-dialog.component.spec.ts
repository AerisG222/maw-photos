import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeyDialogComponent } from './hotkey-dialog.component';

describe('HotkeyDialogComponent', () => {
  let component: HotkeyDialogComponent;
  let fixture: ComponentFixture<HotkeyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotkeyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
