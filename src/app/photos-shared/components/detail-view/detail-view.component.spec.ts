import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailViewComponent } from './detail-view.component';

describe('DetailViewComponent', () => {
    let component: DetailViewComponent;
    let fixture: ComponentFixture<DetailViewComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [DetailViewComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
