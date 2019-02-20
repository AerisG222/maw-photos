import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import {
    LayoutStoreActions,
    PhotoStoreActions,
    PhotoStoreSelectors,
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-photo-list-toolbar',
    templateUrl: './photo-list-toolbar.component.html',
    styleUrls: ['./photo-list-toolbar.component.scss']
})
export class PhotoListToolbarComponent implements OnInit, OnDestroy {
    @Input() allowCategoryDownload: boolean;

    private destroy$ = new Subject<boolean>();
    private _hotkeys: Hotkey[] = [];

    isToolbarExpanded$: Observable<boolean>;
    settings: Settings;
    categoryDownloadUrl: string = null;

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

        const settings$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectSettings),
                tap(settings => this.settings = settings),
                takeUntil(this.destroy$)
            ).subscribe();

        this.isToolbarExpanded$ = this._store$
            .pipe(
                select(SettingsStoreSelectors.selectPhotoListToolbarExpandedState)
            );

        const activePhoto$ = this._store$
            .pipe(
                select(PhotoStoreSelectors.selectCurrentPhoto),
//                tap(photo => this.categoryDownloadUrl = this.assetPathService.getPath(`/photos/download-category/${photo.categoryId}`)),
                tap(photo => this.smDownloadUrl = photo.imageSm.url),
                tap(photo => this.mdDownloadUrl = photo.imageMd.url),
                tap(photo => this.lgDownloadUrl = photo.imageLg.url),
                tap(photo => this.prtDownloadUrl = photo.imagePrt.url),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._hotkeys);
        this.destroy$.next(true);
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
            new Hotkey('s', (event: KeyboardEvent) => this.onHotkeyToggleSize(event), [], 'Toggle Thumbnail Size')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('f', (event: KeyboardEvent) => this.onHotkeyFullscreen(event), [], 'Enter Fullscreen')
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
        this.onToggleCategoryBreadcrumbs();

        return false;
    }

    private onHotkeyToggleSize(evt: KeyboardEvent): boolean {
        this.onToggleSize();

        return false;
    }

    private onHotkeyFullscreen(evt: KeyboardEvent): boolean {
        this.onToggleFullscreen();

        return false;
    }

    private onHotkeyRotateClockwise(evt: KeyboardEvent): boolean {
        this.onRotateClockwise();

        return false;
    }

    private onHotkeyRotateCounterClockwise(evt: KeyboardEvent): boolean {
        this.onRotateCounterClockwise();

        return false;
    }

    private onHotkeyTogglePhotoListToolbar(evt: KeyboardEvent): boolean {
        this.onTogglePhotoListToolbar();

        return false;
    }

    private onHotkeyMoveNext(evt: KeyboardEvent): boolean {
        this.onMoveNext();

        return false;
    }

    private onHotkeyMovePrevious(evt: KeyboardEvent): boolean {
        this.onMovePrevious();

        return false;
    }

    private onHotkeyToggleSlideshow(evt: KeyboardEvent): boolean {
        this.onToggleSlideshow();

        return false;
    }
}
