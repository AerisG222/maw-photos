import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchLinkComponent } from './search-link.component';

describe('SearchLinkComponent', () => {
  let component: SearchLinkComponent;
  let fixture: ComponentFixture<SearchLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
