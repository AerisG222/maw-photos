import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapViewComponent } from './map-view.component';

describe('MapViewComponent', () => {
    let component: MapViewComponent;
    let fixture: ComponentFixture<MapViewComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [MapViewComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MapViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
