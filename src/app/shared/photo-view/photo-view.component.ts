import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap, take } from 'rxjs/operators';

import { toolbarShow } from '../animations';
import { Photo } from 'src/app/core/models/photo.model';
import { PhotoEffects } from 'src/app/core/models/photo-effects.model';
import { Settings } from 'src/app/core/models/settings.model';
import { EffectStyleBuilderService } from 'src/app/core/services/effect-style-builder.service';
import { SlideshowControlService } from 'src/app/core/services/slideshow-control.service';
import { Category } from 'src/app/core/models/category.model';
import {
    PhotoStoreActions,
    PhotoStoreSelectors,
    SettingsStoreSelectors,
    PhotoCategoryStoreSelectors
} from 'src/app/core/root-store';

// TODO: look at updating source images to higher quality jpgs

@Component({
    selector: 'app-photo-view',
    templateUrl: './photo-view.component.html',
    styleUrls: ['./photo-view.component.scss'],
    animations: [
        trigger('toolbarFadeIn', [
            transition('* => *', [
                useAnimation(toolbarShow)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoViewComponent implements OnInit {
    @Input() allowCategoryDownload: boolean;
    @Input() showCategoryAsLink: boolean;

    settings$: Observable<Settings>;
    category$: Observable<Category>;
    photos$: Observable<Photo[]>;
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;

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
                select(PhotoCategoryStoreSelectors.selectCurrentCategoryAsCategory)
            );

        this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos),
                filter(photos => !!photos && photos.length > 0),
                tap(photos => this.setCurrentPhoto(photos[0])),
                take(1)
            ).subscribe();

        this.photos$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectAllPhotos)
            );

        this.activePhoto$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(x => !!x)
            );

        this.effects$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhotoEffects),
                filter(x => !!x)
            );
    }

    getEffectStyles(effects: PhotoEffects) {
        const style = this.effectStyleBuilder.buildFilter(effects);

        return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
    }

    getTransform(effects: PhotoEffects) {
        const style = this.effectStyleBuilder.buildTransform(effects);

        return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
    }

    onSwipeLeft(evt): void {
        this.store$.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onSwipeRight(evt): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onSelectPhoto(photo: Photo): void {
        this.setCurrentPhoto(photo);
    }

    private setCurrentPhoto(photo: Photo): void {
        this.store$.dispatch(PhotoStoreActions.setCurrent({ photo }));
    }
}
