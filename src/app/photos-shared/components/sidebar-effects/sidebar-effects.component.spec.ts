import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarEffectsComponent } from './sidebar-effects.component';

describe('SidebarEffectsComponent', () => {
    let component: SidebarEffectsComponent;
    let fixture: ComponentFixture<SidebarEffectsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SidebarEffectsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarEffectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
