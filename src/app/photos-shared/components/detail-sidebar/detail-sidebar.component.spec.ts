import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailSidebarComponent } from './detail-sidebar.component';

describe('DetailSidebarComponent', () => {
    let component: DetailSidebarComponent;
    let fixture: ComponentFixture<DetailSidebarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DetailSidebarComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
