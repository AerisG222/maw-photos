import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MinimapCardComponent } from './minimap-card.component';

describe('MinimapCardComponent', () => {
    let component: MinimapCardComponent;
    let fixture: ComponentFixture<MinimapCardComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MinimapCardComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MinimapCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
