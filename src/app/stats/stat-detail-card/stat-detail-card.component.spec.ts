import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatDetailCardComponent } from './stat-detail-card.component';

describe('StatDetailCardComponent', () => {
  let component: StatDetailCardComponent;
  let fixture: ComponentFixture<StatDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
