import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { PhotoStoreActions, PhotoStoreSelectors } from 'src/app/core/root-store/photo-store';
import { RootStoreState, SettingsStoreSelectors, SettingsStoreActions } from 'src/app/core/root-store';
import { Settings } from 'src/app/core/models/settings.model';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { AssetPathService, assetPathServiceToken } from 'src/app/core/services/asset-path.service';
import { LayoutStoreActions } from 'src/app/core/root-store/layout-store';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
    selector: 'app-photo-list-toolbar',
    templateUrl: './photo-list-toolbar.component.html',
    styleUrls: ['./photo-list-toolbar.component.scss']
})
export class PhotoListToolbarComponent implements OnInit, OnDestroy {
    @Input() allowCategoryDownload: boolean;

    private destroy$ = new Subject<boolean>();
    private hotkeys: Hotkey[] = [];

    isToolbarExpanded$: Observable<boolean>;
    settings: Settings;
    categoryDownloadUrl: string = null;

    smDownloadUrl: string = null;
    mdDownloadUrl: string = null;
    lgDownloadUrl: string = null;
    prtDownloadUrl: string = null;

    constructor(
        @Inject(assetPathServiceToken) private assetPathService: AssetPathService,
        private _store$: Store<RootStoreState.State>,
        private _hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.hotkeys.push(<Hotkey> this._hotkeysService
            .add(new Hotkey(
                'right',
                (event: KeyboardEvent): boolean => {
                    this._store$.dispatch(new PhotoStoreActions.MoveNextRequestAction());
                    return false;
                }))
            );

        this.hotkeys.push(<Hotkey> this._hotkeysService
            .add(new Hotkey(
                'left',
                (event: KeyboardEvent): boolean => {
                    this._store$.dispatch(new PhotoStoreActions.MovePreviousRequestAction());
                    return false;
                }))
            );

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
                tap(photo => this.categoryDownloadUrl = this.assetPathService.getPath(`/photos/download-category/${photo.categoryId}`)),
                tap(photo => this.smDownloadUrl = photo.smInfo.path),
                tap(photo => this.mdDownloadUrl = photo.mdInfo.path),
                tap(photo => this.lgDownloadUrl = photo.lgInfo.path),
                tap(photo => this.prtDownloadUrl = photo.prtInfo.path),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this.hotkeys);
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
}
