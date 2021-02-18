import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarViewGridButtonComponent } from './toolbar-view-grid-button.component';

describe('ToolbarViewGridButtonComponent', () => {
    let component: ToolbarViewGridButtonComponent;
    let fixture: ComponentFixture<ToolbarViewGridButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolbarViewGridButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarViewGridButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
