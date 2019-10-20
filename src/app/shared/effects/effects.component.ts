import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

import { PhotoEffects } from 'src/app/core/models/photo-effects.model';

@Component({
    selector: 'app-effects',
    templateUrl: './effects.component.html',
    styleUrls: ['./effects.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffectsComponent {
    @Input() effects: PhotoEffects;
    @Output() resetEffects = new EventEmitter<void>();
    @Output() updateEffects = new EventEmitter<PhotoEffects>();

    onResetFilters(): void {
        this.resetEffects.emit();
    }

    onGrayscaleChange(evt: MatSliderChange): void {
        this.update({...this.effects, grayscale: evt.value });
    }

    onSepiaChange(evt: MatSliderChange): void {
        this.update({...this.effects, sepia: evt.value });
    }

    onBrightnessChange(evt: MatSliderChange): void {
        this.update({...this.effects, brightness: evt.value });
    }

    onSaturationChange(evt: MatSliderChange): void {
        this.update({...this.effects, saturation: evt.value });
    }

    onContrastChange(evt: MatSliderChange): void {
        this.update({...this.effects, contrast: evt.value });
    }

    onInvertChange(evt: MatSliderChange): void {
        this.update({...this.effects, invert: evt.value });
    }

    onBlurChange(evt: MatSliderChange): void {
        this.update({...this.effects, blur: evt.value });
    }

    onHueRotateChange(evt: MatSliderChange): void {
        this.update({...this.effects, hueRotate: evt.value });
    }

    private update(newEffects): void {
        this.updateEffects.emit(newEffects);
    }
}
