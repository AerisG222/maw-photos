import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullscreenViewComponent } from './fullscreen-view.component';

describe('FullscreenViewComponent', () => {
    let component: FullscreenViewComponent;
    let fixture: ComponentFixture<FullscreenViewComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [FullscreenViewComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(FullscreenViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
