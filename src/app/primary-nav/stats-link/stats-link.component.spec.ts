import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsLinkComponent } from './stats-link.component';

describe('StatsLinkComponent', () => {
    let component: StatsLinkComponent;
    let fixture: ComponentFixture<StatsLinkComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [StatsLinkComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
