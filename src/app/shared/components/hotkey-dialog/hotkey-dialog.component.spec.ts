import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotkeyDialogComponent } from './hotkey-dialog.component';

describe('HotkeyDialogComponent', () => {
    let component: HotkeyDialogComponent;
    let fixture: ComponentFixture<HotkeyDialogComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [HotkeyDialogComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HotkeyDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
