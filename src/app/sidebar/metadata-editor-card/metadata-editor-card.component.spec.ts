import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetadataEditorCardComponent } from './metadata-editor-card.component';

describe('MetadataEditorCardComponent', () => {
    let component: MetadataEditorCardComponent;
    let fixture: ComponentFixture<MetadataEditorCardComponent>;

    beforeEach(
        waitForAsync(async () => {
            await TestBed.configureTestingModule({
                declarations: [MetadataEditorCardComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MetadataEditorCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
