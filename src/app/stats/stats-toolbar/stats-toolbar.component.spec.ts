import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsToolbarComponent } from './stats-toolbar.component';

describe('StatsToolbarComponent', () => {
  let component: StatsToolbarComponent;
  let fixture: ComponentFixture<StatsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
