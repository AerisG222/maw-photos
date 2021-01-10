import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLinkBaseComponent } from './button-link-base.component';

describe('ButtonLinkBaseComponent', () => {
  let component: ButtonLinkBaseComponent;
  let fixture: ComponentFixture<ButtonLinkBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLinkBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLinkBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
