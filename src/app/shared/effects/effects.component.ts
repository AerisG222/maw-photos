import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material';

import { PhotoEffects } from 'src/app/core/models/photo-effects.model';

@Component({
    selector: 'app-effects',
    templateUrl: './effects.component.html',
    styleUrls: ['./effects.component.scss']
})
export class EffectsComponent {
    @Input() effects: PhotoEffects;
    @Output() resetEffects = new EventEmitter<void>();
    @Output() updateEffects = new EventEmitter<PhotoEffects>();

    onResetFilters(): void {
        this.resetEffects.emit();
    }

    onGrayscaleChange(evt: MatSliderChange): void {
        this.effects.grayscale = evt.value;
        this.update();
    }

    onSepiaChange(evt: MatSliderChange): void {
        this.effects.sepia = evt.value;
        this.update();
    }

    onBrightnessChange(evt: MatSliderChange): void {
        this.effects.brightness = evt.value;
        this.update();
    }

    onSaturationChange(evt: MatSliderChange): void {
        this.effects.saturation = evt.value;
        this.update();
    }

    onContrastChange(evt: MatSliderChange): void {
        this.effects.contrast = evt.value;
        this.update();
    }

    onInvertChange(evt: MatSliderChange): void {
        this.effects.invert = evt.value;
        this.update();
    }

    onBlurChange(evt: MatSliderChange): void {
        this.effects.blur = evt.value;
        this.update();
    }

    onHueRotateChange(evt: MatSliderChange): void {
        this.effects.hueRotate = evt.value;
        this.update();
    }

    private update(): void {
        this.updateEffects.emit(this.effects);
    }
}
