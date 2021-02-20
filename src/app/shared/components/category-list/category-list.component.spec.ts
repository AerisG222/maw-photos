import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';

describe('CategoryList2Component', () => {
    let component: CategoryListComponent;
    let fixture: ComponentFixture<CategoryListComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [CategoryListComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
