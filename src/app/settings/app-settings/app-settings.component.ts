import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AppSettingsFacade } from '@core/facades/settings/app-settings-facade';
import { allThemeDetails, toThemeDefaulted } from '@models';
import { AppSettings, DEFAULT_APP_SETTINGS } from '@models';
import { BaseSettingsComponent } from '../base-settings/base-settings.component';

@Component({
    selector: 'app-app-settings',
    templateUrl: './app-settings.component.html',
    styleUrls: ['./app-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSettingsComponent extends BaseSettingsComponent<AppSettings> {
    form: UntypedFormGroup;
    themes = allThemeDetails;

    constructor(private fb: UntypedFormBuilder, public facade: AppSettingsFacade) {
        super(facade);

        this.form = this.fb.group({
            theme: [DEFAULT_APP_SETTINGS.theme, Validators.required],
        });

        this.resetForm();
    }

    protected readForm(): AppSettings {
        return {
            theme: toThemeDefaulted(this.form.get('theme')?.value as string),
        };
    }

    protected updateForm(settings: AppSettings): void {
        this.form.patchValue({
            theme: settings.theme,
        });
    }
}
