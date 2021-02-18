import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultCountComponent } from './result-count.component';

describe('ResultCountComponent', () => {
    let component: ResultCountComponent;
    let fixture: ComponentFixture<ResultCountComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ResultCountComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
