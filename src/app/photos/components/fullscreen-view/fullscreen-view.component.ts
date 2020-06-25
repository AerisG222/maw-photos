import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LayoutStoreActions } from 'src/app/core/root-store';
import { PhotoStoreSelectors } from 'src/app/photos/store';
import { Photo } from 'src/app/models/photo.model';
import { PhotoEffects } from 'src/app/models/photo-effects.model';
import { EffectStyleBuilderService } from 'src/app/photos/services/effect-style-builder.service';

@Component({
    selector: 'app-photos-fullscreen-view',
    templateUrl: './fullscreen-view.component.html',
    styleUrls: ['./fullscreen-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullscreenViewComponent implements OnInit, OnDestroy {
    activePhoto$: Observable<Photo>;
    effects$: Observable<PhotoEffects>;

    constructor(
        private store$: Store,
        private effectStyleBuilder: EffectStyleBuilderService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
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

    ngOnDestroy(): void {
        this.store$.dispatch(LayoutStoreActions.exitFullscreenRequest());
    }

    getTransform(effects: PhotoEffects): SafeStyle {
        const style = this.effectStyleBuilder.buildTransform(effects);

        return this.sanitizer.bypassSecurityTrustStyle(style.join(' '));
    }
}
