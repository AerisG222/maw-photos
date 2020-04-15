import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoStatsComponent } from './photo-stats.component';

describe('PhotoStatsComponent', () => {
  let component: PhotoStatsComponent;
  let fixture: ComponentFixture<PhotoStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
