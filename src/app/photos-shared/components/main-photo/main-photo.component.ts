import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { PhotoStoreActions, PhotoStoreSelectors } from '@core/root-store';
import { Photo, PhotoEffects, ThumbnailSize } from '@models';
import { buildEffectFilter, buildEffectTransform } from 'src/app/models/helpers/photo-effects';

@Component({
    selector: 'app-photos-main-photo',
    templateUrl: './main-photo.component.html',
    styleUrls: ['./main-photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPhotoComponent {
    @Input() showHeader = false;
    @Input() showPhotoList = false;
    @Input() hasOneToolbarInMobile = false;
    @Input() photoListThumbnailSize = ThumbnailSize.default;

    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    effects$ = this.store.select(PhotoStoreSelectors.activePhotoEffects);

    constructor(
        private store: Store,
        private sanitizer: DomSanitizer
    ) {}

    onSwipeLeft(): void {
        this.store.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(): void {
        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    getSourceset(photo: Photo | null): string {
        if (photo) {
            return `${photo.imageMd.url} ${photo.imageMd.width}w, ${photo.imageLg.url} ${photo.imageLg.width}w`;
        }

        return '';
    }

    getEffectStyles(effects: PhotoEffects | null): SafeStyle {
        if (effects) {
            const style = buildEffectFilter(effects);

            return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
        }

        return '';
    }

    getTransform(effects: PhotoEffects | null): SafeStyle {
        if (effects) {
            const style = buildEffectTransform(effects);

            return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
        }

        return '';
    }

    getMaxHeightClass(): string {
        let clss: string;

        if (this.showHeader) {
            clss = 'header-';
        } else {
            clss = 'no-header-';
        }

        if (this.showPhotoList) {
            switch (this.photoListThumbnailSize) {
                case ThumbnailSize.small:
                    clss += 'small-thumb';
                    break;
                case ThumbnailSize.verySmall:
                    clss += 'very-small-thumb';
                    break;
                case ThumbnailSize.tiny:
                    clss += 'tiny-thumb';
                    break;
                default:
                    clss += 'thumb';
            }
        } else {
            clss += 'no-thumb';
        }

        return clss;
    }
}
