import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeyTableComponent } from './hotkey-table.component';

describe('HotkeyTableComponent', () => {
  let component: HotkeyTableComponent;
  let fixture: ComponentFixture<HotkeyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotkeyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
