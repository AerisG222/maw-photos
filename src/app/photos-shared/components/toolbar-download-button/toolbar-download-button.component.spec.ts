import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarDownloadButtonComponent } from './toolbar-download-button.component';

describe('ToolbarDownloadButtonComponent', () => {
    let component: ToolbarDownloadButtonComponent;
    let fixture: ComponentFixture<ToolbarDownloadButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ToolbarDownloadButtonComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarDownloadButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
