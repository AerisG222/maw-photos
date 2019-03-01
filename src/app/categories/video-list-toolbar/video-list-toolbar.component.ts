import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { RootStoreState, SettingsStoreActions, SettingsStoreSelectors } from 'src/app/core/root-store';
import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { Settings } from 'src/app/core/models/settings.model';
import { VideoSize } from 'src/app/core/models/video-size.model';

@Component({
    selector: 'app-video-list-toolbar',
    templateUrl: './video-list-toolbar.component.html',
    styleUrls: ['./video-list-toolbar.component.scss']
})
export class VideoListToolbarComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<boolean>();
    private _hotkeys: Hotkey[] = [];

    isToolbarExpanded$: Observable<boolean>;
    settings: Settings;

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
                select(SettingsStoreSelectors.selectVideoListToolbarExpandedState)
            );
    }

    ngOnDestroy(): void {
        this._hotkeysService.remove(this._hotkeys);
        this.destroy$.next(true);
    }

    onToggleCategoryBreadcrumbs(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleVideoListCategoryBreadcrumbsRequestAction());
    }

    onToggleVideoListToolbar(): void {
        this._store$.dispatch(new SettingsStoreActions.ToggleVideoListToolbarExpandedStateRequestAction());
    }

    onToggleThumbnailSize(): void {
        const size = ThumbnailSize.nextSize(this.settings.videoListThumbnailSize.name);

        this._store$.dispatch(new SettingsStoreActions.UpdateVideoListThumbnailSizeRequestAction({ newSize: size }));
    }

    onToggleVideoSize(): void {
        const size = VideoSize.nextSize(this.settings.videoListVideoSize.name);

        this._store$.dispatch(new SettingsStoreActions.UpdateVideoListVideoSizeRequestAction({ newSize: size }));
    }

    private configureHotkeys(): void {
        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('t', (event: KeyboardEvent) => this.onHotkeyToggleTitle(event), [], 'Toggle Title / Breadcrumbs')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('s', (event: KeyboardEvent) => this.onHotkeyToggleThumbnailSize(event), [], 'Toggle Thumbnail Size')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('v', (event: KeyboardEvent) => this.onHotkeyToggleVideoSize(event), [], 'Toggle Video Size')
        ));

        this._hotkeys.push(<Hotkey> this._hotkeysService.add(
            new Hotkey('x', (event: KeyboardEvent) => this.onHotkeyToggleVideoListToolbar(event), [], 'Show / Hide Toolbar')
        ));
    }

    private onHotkeyToggleTitle(evt: KeyboardEvent): boolean {
        this.onToggleCategoryBreadcrumbs();

        return false;
    }

    private onHotkeyToggleVideoListToolbar(evt: KeyboardEvent): boolean {
        this.onToggleVideoListToolbar();

        return false;
    }

    private onHotkeyToggleThumbnailSize(evt: KeyboardEvent): boolean {
        this.onToggleThumbnailSize();

        return false;
    }

    private onHotkeyToggleVideoSize(evt: KeyboardEvent): boolean {
        this.onToggleVideoSize();

        return false;
    }
}
