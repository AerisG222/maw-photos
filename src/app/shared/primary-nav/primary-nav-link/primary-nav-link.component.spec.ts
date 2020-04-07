import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryNavLinkComponent } from './primary-nav-link.component';

describe('PrimaryNavLinkComponent', () => {
  let component: PrimaryNavLinkComponent;
  let fixture: ComponentFixture<PrimaryNavLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryNavLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
