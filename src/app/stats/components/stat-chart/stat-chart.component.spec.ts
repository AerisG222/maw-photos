import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatChartComponent } from './stat-chart.component';

describe('StatChartComponent', () => {
  let component: StatChartComponent;
  let fixture: ComponentFixture<StatChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
