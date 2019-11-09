import { Component, OnInit, OnDestroy, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { MovePreviousButtonComponent } from '../move-previous-button/move-previous-button.component';
import { MoveNextButtonComponent } from '../move-next-button/move-next-button.component';
import { SlideshowButtonComponent } from '../slideshow-button/slideshow-button.component';
import { CanRipple } from 'src/app/core/models/can-ripple.model';
import {
    LayoutStoreActions,
    PhotoStoreActions,
    PhotoStoreSelectors,
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors,
    PhotoCategoryStoreSelectors
} from 'src/app/core/root-store';
import { PhotoCategory } from 'src/app/core/models/photo-category.model';

@Component({
    selector: 'app-photo-list-toolbar',
    templateUrl: './photo-list-toolbar.component.html',
    styleUrls: ['./photo-list-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListToolbarComponent implements OnInit, OnDestroy {
    @Input() allowCategoryDownload: boolean;

    @ViewChild('toggleBreadcrumbsButton') toggleBreadcrumbsButton: MatButton;
    @ViewChild('togglePhotoListButton') togglePhotoListButton: MatButton;
    @ViewChild('toggleThumbnailSizeButton') toggleThumbnailSizeButton: MatButton;
    @ViewChild('fullscreenButton') fullscreenButton: MatButton;
    @ViewChild('movePreviousButton') movePreviousButton: MovePreviousButtonComponent;
    @ViewChild('moveNextButton') moveNextButton: MoveNextButtonComponent;
    @ViewChild('toggleSlideshowButton') toggleSlideshowButton: SlideshowButtonComponent;
    @ViewChild('mapViewButton') mapViewButton: MatButton;

    private destroySub = new Subscription();
    private hotkeys: Hotkey[] = [];

    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;
    enableMapView$: Observable<boolean>;
    category$: Observable<PhotoCategory>;
    settings: Settings;

    smDownloadUrl: string = null;
    mdDownloadUrl: string = null;
    lgDownloadUrl: string = null;
    prtDownloadUrl: string = null;

    constructor(
        private store$: Store<RootStoreState.State>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();

        this.destroySub.add(this.store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            ).subscribe()
        );

        this.category$ = this.store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategory)
            );

        this.enableMapView$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectHasPhotosWithGpsCoordinates)
            );

        this.isFirst$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );

        this.isLast$ = this.store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast)
            );

        this.destroySub.add(this.store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
                filter(x => !!x),
                tap(photo => this.smDownloadUrl = photo.imageSm.downloadUrl),
                tap(photo => this.mdDownloadUrl = photo.imageMd.downloadUrl),
                tap(photo => this.lgDownloadUrl = photo.imageLg.downloadUrl),
                tap(photo => this.prtDownloadUrl = photo.imagePrt.downloadUrl)
            ).subscribe()
        );
    }

    ngOnDestroy(): void {
        this.hotkeysService.remove(this.hotkeys);
        this.destroySub.unsubscribe();
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoListCategoryBreadcrumbsRequest());
    }

    onTogglePhotoList(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoListShowPhotoListRequest());
    }

    onToggleSize(): void {
        const size = ThumbnailSize.nextSize(this.settings.photoListThumbnailSize.name);

        this.store$.dispatch(SettingsStoreActions.updatePhotoListThumbnailSizeRequest({ newSize: size }));
    }

    onToggleFullscreen(): void {
        this.store$.dispatch(PhotoStoreActions.enterFullscreenRequest());
        this.store$.dispatch(LayoutStoreActions.enterFullscreenRequest());
    }

    onToggleMapView(): void {
        this.store$.dispatch(PhotoStoreActions.toggleMapViewRequest());
    }

    onMoveNext(): void {
        this.store$.dispatch(PhotoStoreActions.moveNextRequest());
    }

    onMovePrevious(): void {
        this.store$.dispatch(PhotoStoreActions.movePreviousRequest());
    }

    onToggleSlideshow(): void {
        this.store$.dispatch(PhotoStoreActions.toggleSlideshowRequest());
    }

    private configureHotkeys(): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('left', (event: KeyboardEvent) => this.onHotkeyMovePrevious(event), [], 'Move Previous')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('right', (event: KeyboardEvent) => this.onHotkeyMoveNext(event), [], 'Move Next')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('p', (event: KeyboardEvent) => this.onHotkeyToggleSlideshow(event), [], 'Play / Pause Slideshow')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('t', (event: KeyboardEvent) => this.onHotkeyToggleTitle(event), [], 'Toggle Title / Breadcrumbs')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('l', (event: KeyboardEvent) => this.onHotkeyTogglePhotoList(event), [], 'Toggle Photo List')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('s', (event: KeyboardEvent) => this.onHotkeyToggleSize(event), [], 'Toggle Thumbnail Size')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('f', (event: KeyboardEvent) => this.onHotkeyFullscreen(event), [], 'Enter Fullscreen')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('z', (event: KeyboardEvent) => this.onHotkeyMapView(event), [], 'Enter Map View')
        ) as Hotkey);
    }

    private onHotkeyToggleTitle(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleBreadcrumbsButton);
        this.onToggleCategoryBreadcrumbs();

        return false;
    }

    private onHotkeyTogglePhotoList(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.togglePhotoListButton);
        this.onTogglePhotoList();

        return false;
    }

    private onHotkeyToggleSize(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleThumbnailSizeButton);
        this.onToggleSize();

        return false;
    }

    private onHotkeyFullscreen(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.fullscreenButton);
        this.onToggleFullscreen();

        return false;
    }

    private onHotkeyMapView(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.mapViewButton);
        this.onToggleMapView();

        return false;
    }

    private onHotkeyMoveNext(evt: KeyboardEvent): boolean {
        this.triggerComponentRipple(this.moveNextButton);
        this.onMoveNext();

        return false;
    }

    private onHotkeyMovePrevious(evt: KeyboardEvent): boolean {
        this.triggerComponentRipple(this.movePreviousButton);
        this.onMovePrevious();

        return false;
    }

    private onHotkeyToggleSlideshow(evt: KeyboardEvent): boolean {
        this.triggerComponentRipple(this.toggleSlideshowButton);
        this.onToggleSlideshow();

        return false;
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }

    private triggerComponentRipple(component: CanRipple) {
        if (component) {
            component.triggerRipple();
        }
    }
}
