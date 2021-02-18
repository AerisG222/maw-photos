import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulkEditToolbarComponent } from './bulk-edit-toolbar.component';

describe('BulkEditToolbarComponent', () => {
    let component: BulkEditToolbarComponent;
    let fixture: ComponentFixture<BulkEditToolbarComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [BulkEditToolbarComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BulkEditToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
