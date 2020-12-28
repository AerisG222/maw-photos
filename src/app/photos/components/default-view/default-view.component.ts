import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Photo } from 'src/app/models/photo.model';
import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { Settings } from 'src/app/models/settings.model';
import { EffectStyleBuilderService } from 'src/app/photos/services/effect-style-builder.service';
import { SlideshowControlService } from 'src/app/photos/services/slideshow-control.service';
import { Category } from 'src/app/models/category.model';
import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/photos/store';
import { PhotoCategoryStoreSelectors, SettingsStoreSelectors } from 'src/app/core/root-store';

// TODO: look at updating source images to higher quality jpgs

@Component({
    selector: 'app-photos-default-view',
    templateUrl: './default-view.component.html',
    styleUrls: ['./default-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultViewComponent implements OnInit {
    @Input() allowCategoryDownload: boolean | null = null;
    @Input() showCategoryAsLink: boolean | null = null;

    settings$: Observable<Settings> | null = null;
    category$: Observable<Category> | null = null;
    photos$: Observable<Photo[]> | null = null;
    activePhoto$: Observable<Photo> | null = null;
    effects$: Observable<PhotoEffects> | null = null;

    constructor(
        private store: Store,
        private slideshowControlSvc: SlideshowControlService,  // do not remove, needed so service is created before use
        private effectStyleBuilder: EffectStyleBuilderService,
        private sanitizer: DomSanitizer
    ) {

    }

    ngOnInit(): void {
        this.settings$ = this.store.select(SettingsStoreSelectors.settings);

        this.category$ = this.store
            .select(PhotoCategoryStoreSelectors.activeCategory)
            .pipe(
                filter(x => !!x),
                map(x => x as Category)
            );

        this.photos$ = this.store.select(PhotoStoreSelectors.allPhotos);

        this.activePhoto$ = this.store
            .select(PhotoStoreSelectors.activePhoto)
            .pipe(
                filter(x => !!x),
                map(x => x as Photo)
            );

        this.effects$ = this.store
            .select(PhotoStoreSelectors.activePhotoEffects)
            .pipe(
                filter(x => !!x),
                map(x => x as PhotoEffects)
            );
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
