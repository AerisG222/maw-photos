import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultToolbarComponent } from './default-toolbar.component';

describe('DefaultToolbarComponent', () => {
  let component: DefaultToolbarComponent;
  let fixture: ComponentFixture<DefaultToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});