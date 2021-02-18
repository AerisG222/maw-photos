import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarRotateCounterClockwiseButtonComponent } from './toolbar-rotate-counter-clockwise-button.component';

describe('ToolbarRotateCounterClockwiseButtonComponent', () => {
    let component: ToolbarRotateCounterClockwiseButtonComponent;
    let fixture: ComponentFixture<ToolbarRotateCounterClockwiseButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ToolbarRotateCounterClockwiseButtonComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(
            ToolbarRotateCounterClockwiseButtonComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
