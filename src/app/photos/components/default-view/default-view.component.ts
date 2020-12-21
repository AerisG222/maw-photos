import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap, take, map } from 'rxjs/operators';

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
        private store$: Store,
        private slideshowControlSvc: SlideshowControlService,  // do not remove, needed so service is created before use
        private effectStyleBuilder: EffectStyleBuilderService,
        private sanitizer: DomSanitizer
    ) {

    }

    ngOnInit(): void {
        this.settings$ = this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings)
            );

        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectActiveCategory),
                filter(x => !!x),
                map(x => x as Category)
            );

        this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos),
                filter(photos => !!photos && photos.length > 0),
                tap(photos => this.setActivePhoto(photos[0])),
                take(1)
            ).subscribe();

        this.photos$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos)
            );

        this.activePhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectActivePhoto),
                filter(x => !!x),
                map(x => x as Photo)
            );

        this.effects$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectActivePhotoEffects),
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
        this.store$.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onSelectPhoto(photo: Photo): void {
        this.setActivePhoto(photo);
    }

    private setActivePhoto(photo: Photo): void {
        this.store$.dispatch(PhotoStoreActions.setActivePhotoId({ id: photo.id }));
    }
}
