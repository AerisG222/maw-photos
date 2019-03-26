import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLinkComponent } from './settings-link.component';

describe('SettingsLinkComponent', () => {
  let component: SettingsLinkComponent;
  let fixture: ComponentFixture<SettingsLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
