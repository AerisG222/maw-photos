import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { PhotoStoreSelectors, PhotoStoreActions } from '@core/root-store';

@Component({
    selector: 'app-photos-sidebar-effects',
    templateUrl: './sidebar-effects.component.html',
    styleUrls: ['./sidebar-effects.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarEffectsComponent {
    effects$ = this.store.select(PhotoStoreSelectors.selectActivePhotoEffects);

    constructor(private store: Store) {}

    onGrayscaleChange(newValue: number): void {
        this.store.dispatch(
            PhotoStoreActions.updateEffectGrayscale({
                grayscale: newValue
            })
        );
    }

    onSepiaChange(newValue: number): void {
        this.store.dispatch(
            PhotoStoreActions.updateEffectSepia({
                sepia: newValue
            })
        );
    }

    onBrightnessChange(newValue: number): void {
        this.store.dispatch(
            PhotoStoreActions.updateEffectBrightness({
                brightness: newValue
            })
        );
    }

    onSaturationChange(newValue: number): void {
        this.store.dispatch(
            PhotoStoreActions.updateEffectSaturation({
                saturation: newValue
            })
        );
    }

    onContrastChange(newValue: number): void {
        this.store.dispatch(
            PhotoStoreActions.updateEffectContrast({
                contrast: newValue
            })
        );
    }

    onInvertChange(newValue: number): void {
        this.store.dispatch(
            PhotoStoreActions.updateEffectInvert({
                invert: newValue
            })
        );
    }

    onBlurChange(newValue: number): void {
        this.store.dispatch(
            PhotoStoreActions.updateEffectBlur({
                blur: newValue
            })
        );
    }

    onHueRotateChange(newValue: number): void {
        this.store.dispatch(
            PhotoStoreActions.updateEffectHueRotate({
                hueRotate: newValue
            })
        );
    }

    onResetEffects(): void {
        this.store.dispatch(PhotoStoreActions.resetEffectsRequest());
    }
}
