import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RandomLinkComponent } from './random-link.component';

describe('RandomLinkComponent', () => {
    let component: RandomLinkComponent;
    let fixture: ComponentFixture<RandomLinkComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [RandomLinkComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RandomLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
