import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedStatsComponent } from './combined-stats.component';

describe('CombinedStatsComponent', () => {
  let component: CombinedStatsComponent;
  let fixture: ComponentFixture<CombinedStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinedStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
