import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { ThumbnailSize } from 'src/app/core/models/thumbnail-size.model';
import { Settings } from 'src/app/core/models/settings.model';
import { VideoSize } from 'src/app/core/models/video-size.model';
import { MovePreviousButtonComponent } from 'src/app/shared/move-previous-button/move-previous-button.component';
import { MoveNextButtonComponent } from 'src/app/shared/move-next-button/move-next-button.component';
import { CanRipple } from 'src/app/core/models/can-ripple.model';
import {
    RootStoreState,
    SettingsStoreActions,
    SettingsStoreSelectors,
    VideoStoreActions,
    VideoStoreSelectors
} from 'src/app/core/root-store';

@Component({
    selector: 'app-video-list-toolbar',
    templateUrl: './video-list-toolbar.component.html',
    styleUrls: ['./video-list-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListToolbarComponent implements OnInit, OnDestroy {
    private destroySub = new Subscription();
    private hotkeys: Hotkey[] = [];

    @ViewChild('toggleBreadcrumbsButton') toggleBreadcrumbsButton: MatButton;
    @ViewChild('toggleVideoListButton') toggleVideoListButton: MatButton;
    @ViewChild('toggleThumbnailSizeButton') toggleThumbnailSizeButton: MatButton;
    @ViewChild('toggleVideoSizeButton') toggleVideoSizeButton: MatButton;
    @ViewChild('movePreviousButton') movePreviousButton: MovePreviousButtonComponent;
    @ViewChild('moveNextButton') moveNextButton: MoveNextButtonComponent;

    isFirst$: Observable<boolean>;
    isLast$: Observable<boolean>;
    settings: Settings;

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

        this.isFirst$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectIsCurrentVideoFirst)
            );

        this.isLast$ = this.store$
            .pipe(
                select(VideoStoreSelectors.selectIsCurrentVideoLast)
            );
    }

    ngOnDestroy(): void {
        this.hotkeysService.remove(this.hotkeys);
        this.destroySub.unsubscribe();
    }

    onToggleCategoryBreadcrumbs(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoListCategoryBreadcrumbsRequest());
    }

    onToggleThumbnailSize(): void {
        const size = ThumbnailSize.nextSize(this.settings.videoListThumbnailSize.name);

        this.store$.dispatch(SettingsStoreActions.updateVideoListThumbnailSizeRequest({ newSize: size }));
    }

    onToggleShowVideoList(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoListShowVideoListRequest());
    }

    onToggleVideoSize(): void {
        const size = VideoSize.nextSize(this.settings.videoListVideoSize.name);

        this.store$.dispatch(SettingsStoreActions.updateVideoListVideoSizeRequest({ newSize: size }));
    }

    onMovePrevious(): void {
        this.store$.dispatch(VideoStoreActions.movePreviousRequest());
    }

    onMoveNext(): void {
        this.store$.dispatch(VideoStoreActions.moveNextRequest());
    }

    private configureHotkeys(): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('left', (event: KeyboardEvent) => this.onHotkeyMovePrevious(event), [], 'Move Previous')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('right', (event: KeyboardEvent) => this.onHotkeyMoveNext(event), [], 'Move Next')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('t', (event: KeyboardEvent) => this.onHotkeyToggleTitle(event), [], 'Toggle Title / Breadcrumbs')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('l', (event: KeyboardEvent) => this.onHotkeyToggleShowVideoList(event), [], 'Show/Hide Video List')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('s', (event: KeyboardEvent) => this.onHotkeyToggleThumbnailSize(event), [], 'Toggle Thumbnail Size')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('v', (event: KeyboardEvent) => this.onHotkeyToggleVideoSize(event), [], 'Toggle Video Size')
        ) as Hotkey);
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

    private onHotkeyToggleTitle(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleBreadcrumbsButton);
        this.onToggleCategoryBreadcrumbs();

        return false;
    }

    private onHotkeyToggleShowVideoList(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleVideoListButton);
        this.onToggleShowVideoList();

        return false;
    }

    private onHotkeyToggleThumbnailSize(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleThumbnailSizeButton);
        this.onToggleThumbnailSize();

        return false;
    }

    private onHotkeyToggleVideoSize(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleVideoSizeButton);
        this.onToggleVideoSize();

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
