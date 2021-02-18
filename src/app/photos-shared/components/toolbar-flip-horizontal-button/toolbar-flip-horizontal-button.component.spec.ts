import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarFlipHorizontalButtonComponent } from './toolbar-flip-horizontal-button.component';

describe('ToolbarFlipHorizontalButtonComponent', () => {
    let component: ToolbarFlipHorizontalButtonComponent;
    let fixture: ComponentFixture<ToolbarFlipHorizontalButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ToolbarFlipHorizontalButtonComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarFlipHorizontalButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
