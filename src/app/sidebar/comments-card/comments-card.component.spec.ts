import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommentsCardComponent } from './comments-card.component';

describe('CommentsCardComponent', () => {
    let component: CommentsCardComponent;
    let fixture: ComponentFixture<CommentsCardComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [CommentsCardComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
