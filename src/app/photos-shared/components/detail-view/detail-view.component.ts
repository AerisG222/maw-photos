import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Photo } from 'src/app/models/photo.model';
import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { EffectStyleBuilderService } from 'src/app/core/services/effect-style-builder.service';
import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';
import { PhotoCategoryStoreSelectors, RouterStoreSelectors, SettingsStoreSelectors } from 'src/app/core/root-store';

// TODO: look at updating source images to higher quality jpgs

@Component({
    selector: 'app-photos-detail-view',
    templateUrl: './detail-view.component.html',
    styleUrls: ['./detail-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailViewComponent {
    showCategoryAsLink$ = this.store.select(RouterStoreSelectors.isRandomView);
    allowCategoryDownload$ = this.store.select(RouterStoreSelectors.isPhotosView);
    category$ = this.store.select(PhotoCategoryStoreSelectors.activeCategory);
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    effects$ = this.store.select(PhotoStoreSelectors.activePhotoEffects);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    settings$ = this.store.select(SettingsStoreSelectors.settings);

    constructor(
        private store: Store,
        private effectStyleBuilder: EffectStyleBuilderService,
        private sanitizer: DomSanitizer
    ) {

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

    onSwipeLeft(): void {
        this.store.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(): void {
        this.store.dispatch(PhotoStoreActions.movePreviousRequest());
    }
}
