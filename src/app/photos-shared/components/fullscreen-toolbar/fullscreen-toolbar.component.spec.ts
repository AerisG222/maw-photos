import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullscreenToolbarComponent } from './fullscreen-toolbar.component';

describe('FullscreenToolbarComponent', () => {
    let component: FullscreenToolbarComponent;
    let fixture: ComponentFixture<FullscreenToolbarComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [FullscreenToolbarComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(FullscreenToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
