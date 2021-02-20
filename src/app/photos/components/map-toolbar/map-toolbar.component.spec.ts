import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapToolbarComponent } from './map-toolbar.component';

describe('MapToolbarComponent', () => {
    let component: MapToolbarComponent;
    let fixture: ComponentFixture<MapToolbarComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [MapToolbarComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MapToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
