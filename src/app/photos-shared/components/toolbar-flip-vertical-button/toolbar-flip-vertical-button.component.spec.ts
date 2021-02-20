import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarFlipVerticalButtonComponent } from './toolbar-flip-vertical-button.component';

describe('ToolbarFlipVerticalButtonComponent', () => {
    let component: ToolbarFlipVerticalButtonComponent;
    let fixture: ComponentFixture<ToolbarFlipVerticalButtonComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [ToolbarFlipVerticalButtonComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarFlipVerticalButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
