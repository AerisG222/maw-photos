import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

import { BaseSettingsFacade } from '@core/facades/settings/base-settings-facade';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseSettingsComponent<T> {
    abstract form: FormGroup;

    constructor(public facade: BaseSettingsFacade<T>) {}

    onSave() {
        if (this.form.valid) {
            this.facade.save(this.readForm());
        }
    }

    onCancel() {
        this.resetForm();
    }

    protected resetForm() {
        this.facade.settings$.pipe(first()).subscribe({
            next: (settings) => this.updateForm(settings),
        });
    }

    protected abstract readForm(): T;
    protected abstract updateForm(settings: T): void;
}
