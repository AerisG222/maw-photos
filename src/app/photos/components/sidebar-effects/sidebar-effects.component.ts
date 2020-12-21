import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { PhotoEffects, DEFAULT_PHOTO_EFFECTS } from 'src/app/models/photo-effects.model';
import { PhotoStoreSelectors, PhotoStoreActions } from 'src/app/photos/store';

@Component({
    selector: 'app-photos-sidebar-effects',
    templateUrl: './sidebar-effects.component.html',
    styleUrls: ['./sidebar-effects.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarEffectsComponent implements OnInit, OnDestroy {
    destroySub = new Subscription();
    effects = DEFAULT_PHOTO_EFFECTS;

    constructor(
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectActivePhotoEffects),
                filter(x => !!x),
                map(x => x as PhotoEffects),
                tap(effects => this.effects = effects)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    onGrayscaleChange(evt: MatSliderChange): void {
        this.update({...this.effects, grayscale: evt.value as number});
    }

    onSepiaChange(evt: MatSliderChange): void {
        this.update({...this.effects, sepia: evt.value as number });
    }

    onBrightnessChange(evt: MatSliderChange): void {
        this.update({...this.effects, brightness: evt.value as number });
    }

    onSaturationChange(evt: MatSliderChange): void {
        this.update({...this.effects, saturation: evt.value as number });
    }

    onContrastChange(evt: MatSliderChange): void {
        this.update({...this.effects, contrast: evt.value as number });
    }

    onInvertChange(evt: MatSliderChange): void {
        this.update({...this.effects, invert: evt.value as number });
    }

    onBlurChange(evt: MatSliderChange): void {
        this.update({...this.effects, blur: evt.value as number });
    }

    onHueRotateChange(evt: MatSliderChange): void {
        this.update({...this.effects, hueRotate: evt.value as number });
    }

    onResetEffects(): void {
        this.store$.dispatch(PhotoStoreActions.resetEffectsRequest());
    }

    private update(effects: PhotoEffects): void {
        this.store$.dispatch(PhotoStoreActions.updateEffectsRequest({ effects }));
    }
}
