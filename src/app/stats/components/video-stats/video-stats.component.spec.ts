import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoStatsComponent } from './video-stats.component';

describe('VideoStatsComponent', () => {
    let component: VideoStatsComponent;
    let fixture: ComponentFixture<VideoStatsComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
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
