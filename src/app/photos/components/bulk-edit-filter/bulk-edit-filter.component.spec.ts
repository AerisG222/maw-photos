import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulkEditFilterComponent } from './bulk-edit-filter.component';

describe('BulkEditFilterComponent', () => {
    let component: BulkEditFilterComponent;
    let fixture: ComponentFixture<BulkEditFilterComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [BulkEditFilterComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BulkEditFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
