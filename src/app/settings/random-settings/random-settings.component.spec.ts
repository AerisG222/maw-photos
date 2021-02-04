import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomSettingsComponent } from './random-settings.component';

describe('RandomSettingsComponent', () => {
  let component: RandomSettingsComponent;
  let fixture: ComponentFixture<RandomSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
