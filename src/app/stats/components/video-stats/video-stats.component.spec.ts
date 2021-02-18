import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoStatsComponent } from './video-stats.component';

describe('VideoStatsComponent', () => {
    let component: VideoStatsComponent;
    let fixture: ComponentFixture<VideoStatsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [VideoStatsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(VideoStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
