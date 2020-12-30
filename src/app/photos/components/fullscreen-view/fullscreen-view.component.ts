import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { LayoutStoreActions } from 'src/app/core/root-store';
import { PhotoStoreSelectors } from 'src/app/photos/store';
import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { EffectStyleBuilderService } from 'src/app/photos/services/effect-style-builder.service';

@Component({
    selector: 'app-photos-fullscreen-view',
    templateUrl: './fullscreen-view.component.html',
    styleUrls: ['./fullscreen-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullscreenViewComponent implements OnDestroy {
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    effects$ = this.store.select(PhotoStoreSelectors.activePhotoEffects);

    constructor(
        private store: Store,
        private effectStyleBuilder: EffectStyleBuilderService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnDestroy(): void {
        this.store.dispatch(LayoutStoreActions.exitFullscreenRequest());
    }

    getTransform(effects: PhotoEffects | null): SafeStyle {
        if (!!effects) {
            const style = this.effectStyleBuilder.buildTransform(effects);

            return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
        }

        return '';
    }
}
