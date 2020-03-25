import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMarginComponent } from './content-margin.component';

describe('ContentMarginComponent', () => {
  let component: ContentMarginComponent;
  let fixture: ComponentFixture<ContentMarginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentMarginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
