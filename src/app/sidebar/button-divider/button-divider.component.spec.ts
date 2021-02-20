import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonDividerComponent } from './button-divider.component';

describe('ButtonDividerComponent', () => {
    let component: ButtonDividerComponent;
    let fixture: ComponentFixture<ButtonDividerComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [ButtonDividerComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonDividerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
