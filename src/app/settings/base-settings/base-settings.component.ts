import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

import { BaseSettingsFacade } from '@core/facades/settings/base-settings-facade';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseSettingsComponent<T> {
    abstract form: UntypedFormGroup;

    constructor(public facade: BaseSettingsFacade<T>) {}

    onSave(): void {
        if (this.form.valid) {
            this.facade.save(this.readForm());
        }
    }

    onCancel(): void {
        this.resetForm();
    }

    protected resetForm(): void {
        this.facade.settings$.pipe(first()).subscribe({
            next: (settings) => this.updateForm(settings),
        });
    }

    protected abstract readForm(): T;
    protected abstract updateForm(settings: T): void;
}
