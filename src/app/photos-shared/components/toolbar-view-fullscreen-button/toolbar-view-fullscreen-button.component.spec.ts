import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarViewFullscreenButtonComponent } from './toolbar-view-fullscreen-button.component';

describe('ToolbarViewFullscreenButtonComponent', () => {
    let component: ToolbarViewFullscreenButtonComponent;
    let fixture: ComponentFixture<ToolbarViewFullscreenButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolbarViewFullscreenButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarViewFullscreenButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
