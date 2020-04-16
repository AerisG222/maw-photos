import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsLinkComponent } from './stats-link.component';

describe('StatsLinkComponent', () => {
  let component: StatsLinkComponent;
  let fixture: ComponentFixture<StatsLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
