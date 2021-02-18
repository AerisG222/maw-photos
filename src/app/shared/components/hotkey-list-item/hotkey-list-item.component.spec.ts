import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeyListItemComponent } from './hotkey-list-item.component';

describe('HotkeyListItemComponent', () => {
    let component: HotkeyListItemComponent;
    let fixture: ComponentFixture<HotkeyListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HotkeyListItemComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HotkeyListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
