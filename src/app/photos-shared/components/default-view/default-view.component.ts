import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Photo } from 'src/app/models/photo.model';
import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { EffectStyleBuilderService } from 'src/app/core/services/effect-style-builder.service';
import { SlideshowControlService } from 'src/app/core/services/slideshow-control.service';
import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photos-store';
import { PhotoCategoryStoreSelectors, SettingsStoreSelectors } from 'src/app/core/root-store';

// TODO: look at updating source images to higher quality jpgs

@Component({
    selector: 'app-photos-default-view',
    templateUrl: './default-view.component.html',
    styleUrls: ['./default-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultViewComponent {
    @Input() allowCategoryDownload: boolean | null = null;
    @Input() showCategoryAsLink: boolean | null = null;

    category$ = this.store.select(PhotoCategoryStoreSelectors.activeCategory);
    activePhoto$ = this.store.select(PhotoStoreSelectors.activePhoto);
    effects$ = this.store.select(PhotoStoreSelectors.activePhotoEffects);
    photos$ = this.store.select(PhotoStoreSelectors.allPhotos);
    settings$ = this.store.select(SettingsStoreSelectors.settings);

    constructor(
        private store: Store,
        private slideshowControlSvc: SlideshowControlService,  // do not remove, needed so service is created before use
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
