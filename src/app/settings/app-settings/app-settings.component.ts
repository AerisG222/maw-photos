import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Theme } from '@models';
import { DEFAULT_APP_SETTINGS } from 'src/app/models/settings/app-settings';

@Component({
    selector: 'app-app-settings',
    templateUrl: './app-settings.component.html',
    styleUrls: ['./app-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent {
    form: FormGroup;
    themes = Theme.allThemes;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            theme: [DEFAULT_APP_SETTINGS.theme, Validators.required]
        });
    }

    onSave() {

    }

    onCancel() {

    }
}
