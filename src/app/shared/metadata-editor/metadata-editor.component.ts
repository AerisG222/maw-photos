import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MetadataEditorMode } from './metadata-editor-mode.model';

@Component({
    selector: 'app-metadata-editor',
    templateUrl: './metadata-editor.component.html',
    styleUrls: ['./metadata-editor.component.scss']
})
export class MetadataEditorComponent implements OnInit {
    form: FormGroup;

    @Input() mode: MetadataEditorMode;

    constructor(
        private store$: Store<{}>,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {
        switch (this.mode) {
            case MetadataEditorMode.Photos:
                this.initPhotoEditor();
                break;
            case MetadataEditorMode.Videos:
                this.initVideoEditor();
                break;
            default:
                throw new Error('invalid comment mode!');
        }

        this.form = this.formBuilder.group({
            comment: ['', Validators.required]
        });
    }

    initPhotoEditor(): void {

    }

    initVideoEditor(): void {

    }

    onSave(): void {

    }

    onCancel(): void {

    }
}
