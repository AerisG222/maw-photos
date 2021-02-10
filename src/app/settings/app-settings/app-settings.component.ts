import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppSettingsFacade } from '@core/facades/settings/app-settings-facade';

import { Theme } from '@models';
import { first } from 'rxjs/operators';
import { AppSettings, DEFAULT_APP_SETTINGS } from 'src/app/models/settings/app-settings';

@Component({
    selector: 'app-app-settings',
    templateUrl: './app-settings.component.html',
    styleUrls: ['./app-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent {
    form: FormGroup;
    themes = Theme.allThemes;

    constructor(private fb: FormBuilder, private facade: AppSettingsFacade) {
        this.form = this.fb.group({
            theme: [DEFAULT_APP_SETTINGS.theme, Validators.required]
        });

        this.resetForm();
    }

    onSave() {
        if(this.form.valid) {
            this.facade.save(this.readForm());
        }
    }

    onCancel() {
        this.resetForm();
    }

    private readForm(): AppSettings {
        return {
            theme: Theme.forName(this.form.get('theme')?.value as string)
        };
    }

    private resetForm() {
        this.facade.settings$.pipe(first())
            .subscribe({
                next: settings => this.updateForm(settings)
            });
    }

    private updateForm(settings: AppSettings) {
        this.form.patchValue({
            theme: settings.theme.name
        });
    }
}
