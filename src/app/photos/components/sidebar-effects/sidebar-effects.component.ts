import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-sidebar-effects',
    templateUrl: './sidebar-effects.component.html',
    styleUrls: ['./sidebar-effects.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarEffectsComponent {
    effects$ = this.store.select(PhotoStoreSelectors.activePhotoEffects);

    constructor(
        private store: Store
    ) {

    }

    onGrayscaleChange(evt: MatSliderChange): void {
        this.store.dispatch(PhotoStoreActions.updateEffectGrayscale({ grayscale: evt.value as number }));
    }

    onSepiaChange(evt: MatSliderChange): void {
        this.store.dispatch(PhotoStoreActions.updateEffectSepia({ sepia: evt.value as number }));
    }

    onBrightnessChange(evt: MatSliderChange): void {
        this.store.dispatch(PhotoStoreActions.updateEffectBrightness({ brightness: evt.value as number }));
    }

    onSaturationChange(evt: MatSliderChange): void {
        this.store.dispatch(PhotoStoreActions.updateEffectSaturation({ saturation: evt.value as number }));
    }

    onContrastChange(evt: MatSliderChange): void {
        this.store.dispatch(PhotoStoreActions.updateEffectContrast({ contrast: evt.value as number }));
    }

    onInvertChange(evt: MatSliderChange): void {
        this.store.dispatch(PhotoStoreActions.updateEffectInvert({ invert: evt.value as number }));
    }

    onBlurChange(evt: MatSliderChange): void {
        this.store.dispatch(PhotoStoreActions.updateEffectBlur({ blur: evt.value as number }));
    }

    onHueRotateChange(evt: MatSliderChange): void {
        this.store.dispatch(PhotoStoreActions.updateEffectHueRotate({ hueRotate: evt.value as number }));
    }

    onResetEffects(): void {
        this.store.dispatch(PhotoStoreActions.resetEffectsRequest());
    }
}
