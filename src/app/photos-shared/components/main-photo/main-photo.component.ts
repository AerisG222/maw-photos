import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, PhotoStoreSelectors } from '@core/root-store';
import { EffectStyleBuilderService } from '@core/services';
import { Photo, PhotoEffects } from '@models';

@Component({
    selector: 'app-photos-main-photo',
    templateUrl: './main-photo.component.html',
    styleUrls: ['./main-photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPhotoComponent {
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    effects$ = this.store.select(PhotoStoreSelectors.activePhotoEffects);

    constructor(
        private store: Store,
        private effectStyleBuilder: EffectStyleBuilderService,
        private sanitizer: DomSanitizer
    ) { }

    onSwipeLeft(): void {
        this.store.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(): void {
        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    getSourceset(photo: Photo | null): string {
        if (!!photo) {
            return `${photo.imageMd.url} ${photo.imageMd.width}w, ${photo.imageLg.url} ${photo.imageLg.width}w`;
        }

        return '';
    }

    getEffectStyles(effects: PhotoEffects | null): SafeStyle {
        if (!!effects) {
            const style = this.effectStyleBuilder.buildFilter(effects);

            return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
        }

        return '';
    }

    getTransform(effects: PhotoEffects | null): SafeStyle {
        if (!!effects) {
            const style = this.effectStyleBuilder.buildTransform(effects);

            return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
        }

        return '';
    }
}
