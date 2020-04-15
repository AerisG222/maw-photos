import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenToolbarComponent } from './fullscreen-toolbar.component';

describe('FullscreenToolbarComponent', () => {
  let component: FullscreenToolbarComponent;
  let fixture: ComponentFixture<FullscreenToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
