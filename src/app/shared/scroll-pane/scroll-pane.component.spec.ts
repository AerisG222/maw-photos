import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollPaneComponent } from './scroll-pane.component';

describe('ScrollPanelComponent', () => {
  let component: ScrollPaneComponent;
  let fixture: ComponentFixture<ScrollPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
