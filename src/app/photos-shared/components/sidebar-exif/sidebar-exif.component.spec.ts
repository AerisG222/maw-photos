import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarExifComponent } from './sidebar-exif.component';

describe('SidebarExifComponent', () => {
    let component: SidebarExifComponent;
    let fixture: ComponentFixture<SidebarExifComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SidebarExifComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarExifComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
