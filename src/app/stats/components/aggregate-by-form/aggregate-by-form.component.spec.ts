import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateByFormComponent } from './aggregate-by-form.component';

describe('AggregateByFormComponent', () => {
  let component: AggregateByFormComponent;
  let fixture: ComponentFixture<AggregateByFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregateByFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateByFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
