import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPhotoComponent } from './grid-photo.component';

describe('GridPhotoComponent', () => {
    let component: GridPhotoComponent;
    let fixture: ComponentFixture<GridPhotoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GridPhotoComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridPhotoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
