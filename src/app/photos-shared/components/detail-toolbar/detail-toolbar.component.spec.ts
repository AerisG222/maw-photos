import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailToolbarComponent } from './detail-toolbar.component';

describe('DetailToolbarComponent', () => {
    let component: DetailToolbarComponent;
    let fixture: ComponentFixture<DetailToolbarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DetailToolbarComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
