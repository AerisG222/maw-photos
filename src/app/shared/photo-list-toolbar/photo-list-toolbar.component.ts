import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
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
    styleUrls: ['./photo-list-toolbar.component.scss']
})
export class PhotoListToolbarComponent implements OnInit, OnDestroy {
    @Input() allowCategoryDownload: boolean;

    @ViewChild('toggleBreadcrumbsButton') toggleBreadcrumbsButton: MatButton;
    @ViewChild('togglePhotoListButton') togglePhotoListButton: MatButton;
    @ViewChild('toggleThumbnailSizeButton') toggleThumbnailSizeButton: MatButton;
    @ViewChild('fullscreenButton') fullscreenButton: MatButton;
    @ViewChild('rotateCounterClockwiseButton') rotateCounterClockwiseButton: MatButton;
    @ViewChild('rotateClockwiseButton') rotateClockwiseButton: MatButton;
    @ViewChild('toggleToolbarButton') toggleToolbarButton: MatButton;
    @ViewChild('movePreviousButton') movePreviousButton: MovePreviousButtonComponent;
    @ViewChild('moveNextButton') moveNextButton: MoveNextButtonComponent;
    @ViewChild('toggleSlideshowButton') toggleSlideshowButton: SlideshowButtonComponent;
    @ViewChild('mapViewButton') mapViewButton: MatButton;

    private destroySub = new Subscription();
    private _hotkeys: Hotkey[] = [];

    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;
    isToolbarExpanded$: Observable<boolean>;
    enableMapView$: Observable<boolean>;
    category$: Observable<PhotoCategory>;
    settings: Settings;

    smDownloadUrl: string = null;
    mdDownloadUrl: string = null;
    lgDownloadUrl: string = null;
    prtDownloadUrl: string = null;

    constructor(
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.configureHotkeys();

        this.destroySub.add(this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings)
            ).subscribe()
        );

        this.category$ = this._store$
            .pipe(
                select(PhotoCategoryStoreSelectors.selectCurrentCategory)
            );

        this.enableMapView$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectHasPhotosWithGpsCoordinates)
            );

        this.isToolbarExpanded$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectPhotoListToolbarExpandedState)
            );

        this.isFirst$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoFirst)
            );

        this.isLast$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectIsCurrentPhotoLast)
            );

        this.destroySub.add(this._store$
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
        this._hotkeysService.remove(this._hotkeys);
        this.destroySub.unsubscribe();
    }

    onToggleCategoryBreadcrumbs(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoListCategoryBreadcrumbsRequestAction());
    }

    onRotateClockwise(): void {
        this._store$.dispatch(new PhotoStoreActions.RotateClockwiseRequestAction());
    }

    onRotateCounterClockwise(): void {
        this._store$.dispatch(new PhotoStoreActions.RotateCounterClockwiseRequestAction());
    }

    onTogglePhotoList(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoListShowPhotoListRequestAction());
    }

    onToggleSize(): void {
        const size = ThumbnailSize.nextSize(this.settings.photoListThumbnailSize.name);

        this._store$.dispatch(new SettingsStoreActions.UpdatePhotoListThumbnailSizeRequestAction({ newSize: size }));
    }

    onToggleFullscreen(): void {
        this._store$.dispatch(new PhotoStoreActions.EnterFullscreenRequestAction());
        this._store$.dispatch(new LayoutStoreActions.EnterFullscreenRequestAction());
    }

    onTogglePhotoListToolbar(): void {
        this._store$.dispatch(new SettingsStoreActions.TogglePhotoListToolbarExpandedStateRequestAction());
    }

    onToggleMapView(): void {
        this._store$.dispatch(new PhotoStoreActions.ToggleMapViewRequestAction());
    }

    onMoveNext(): void {
        this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
    }

    onMovePrevious(): void {
        this._store$.dispatch(new PhotoStoreActions.MovePreviousRequestAction());
    }

    onToggleSlideshow(): void {
        this._store$.dispatch(new PhotoStoreActions.ToggleSlideshowRequestAction());
    }

    private configureHotkeys(): void {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('left', (event: KeyboardEvent) => this.onHotkeyMovePrevious(event), [], 'Move Previous')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('right', (event: KeyboardEvent) => this.onHotkeyMoveNext(event), [], 'Move Next')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('p', (event: KeyboardEvent) => this.onHotkeyToggleSlideshow(event), [], 'Play / Pause Slideshow')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('t', (event: KeyboardEvent) => this.onHotkeyToggleTitle(event), [], 'Toggle Title / Breadcrumbs')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('l', (event: KeyboardEvent) => this.onHotkeyTogglePhotoList(event), [], 'Toggle Photo List')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('s', (event: KeyboardEvent) => this.onHotkeyToggleSize(event), [], 'Toggle Thumbnail Size')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('f', (event: KeyboardEvent) => this.onHotkeyFullscreen(event), [], 'Enter Fullscreen')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('z', (event: KeyboardEvent) => this.onHotkeyMapView(event), [], 'Enter Map View')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('a', (event: KeyboardEvent) => this.onHotkeyRotateCounterClockwise(event), [], 'Rotate Counter Clockwise')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('d', (event: KeyboardEvent) => this.onHotkeyRotateClockwise(event), [], 'Rotate Clockwise')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('x', (event: KeyboardEvent) => this.onHotkeyTogglePhotoListToolbar(event), [], 'Show / Hide Toolbar')
        ));
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

    private onHotkeyRotateClockwise(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.rotateClockwiseButton);
        this.onRotateClockwise();

        return false;
    }

    private onHotkeyRotateCounterClockwise(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.rotateCounterClockwiseButton);
        this.onRotateCounterClockwise();

        return false;
    }

    private onHotkeyTogglePhotoListToolbar(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleToolbarButton);
        this.onTogglePhotoListToolbar();

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
