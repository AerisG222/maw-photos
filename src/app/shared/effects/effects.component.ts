import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/core/root-store';

@Component({
    selector: 'app-effects',
    templateUrl: './effects.component.html',
    styleUrls: ['./effects.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EffectsComponent implements OnInit, OnDestroy {
    destroySub = new Subscription();
    effects: PhotoEffects;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoEffects),
                tap(effects => this.effects = effects)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
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

    onResetEffects(): void {
        this.store$.dispatch(PhotoStoreActions.resetEffectsRequest());
    }

    private update(effects: PhotoEffects): void {
        this.store$.dispatch(PhotoStoreActions.updateEffectsRequest({ effects }));
    }
}
