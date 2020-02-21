import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { MatButton } from '@angular/material/button';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { sidebarShow, sidebarHide, sidebarInfoPanelShow, sidebarInfoPanelHide } from '../animations';
import { CommentMode } from '../comments/comment-mode.model';
import { RatingMode } from '../rating/rating-mode.model';
import {
    SettingsStoreActions,
    SettingsStoreSelectors,
    AuthStoreSelectors
} from 'src/app/core/root-store';
import { MinimapMode } from '../minimap/minimap-mode.model';
import { MetadataEditorMode } from '../metadata-editor/metadata-editor-mode.model';

@Component({
    selector: 'app-photo-info-panel',
    templateUrl: './photo-info-panel.component.html',
    styleUrls: ['./photo-info-panel.component.scss'],
    animations: [
        trigger('sidebarFlyInOut', [
            transition(':enter', [
                useAnimation(sidebarShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarHide)
            ])
        ]),
        trigger('toggleInfoPanel', [
            transition(':enter', [
                useAnimation(sidebarInfoPanelShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarInfoPanelHide)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoInfoPanelComponent implements OnInit, OnDestroy {
    private hotkeys: Hotkey[] = [];

    commentMode = CommentMode;
    minimapMode = MinimapMode;
    ratingMode = RatingMode;
    metadataEditorMode = MetadataEditorMode;

    isAdmin$: Observable<boolean>;
    endSidenavExpanded$: Observable<boolean>;
    showComments$: Observable<boolean>;
    showEffects$: Observable<boolean>;
    showExif$: Observable<boolean>;
    showRatings$: Observable<boolean>;
    showMinimap$: Observable<boolean>;
    showHistogram$: Observable<boolean>;
    showMetadataEditor$: Observable<boolean>;
    enableButtons$: Observable<boolean>;

    @ViewChild('toggleInfoPanelButton') toggleInfoPanelButton: MatButton;
    @ViewChild('toggleRatingsButton') toggleRatingsButton: MatButton;
    @ViewChild('toggleCommentsButton') toggleCommentsButton: MatButton;
    @ViewChild('toggleExifButton') toggleExifButton: MatButton;
    @ViewChild('toggleEffectsButton') toggleEffectsButton: MatButton;
    @ViewChild('toggleMinimapButton') toggleMinimapButton: MatButton;
    @ViewChild('toggleHistogramButton') toggleHistogramButton: MatButton;
    @ViewChild('toggleMetadataEditorButton') toggleMetadataEditorButton: MatButton;

    constructor(
        private store$: Store<{}>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.isAdmin$ = this.store$.pipe(
            select(AuthStoreSelectors.selectIsAdmin),
            tap(isAdmin => {
                this.hotkeysService.remove(this.hotkeys);
                this.configureHotkeys(isAdmin)
            })
        );

        this.enableButtons$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelExpandedState)
        );

        this.endSidenavExpanded$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelExpandedState)
        );

        this.showComments$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowComments)
        );

        this.showMetadataEditor$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowMetadataEditor)
        );

        this.showEffects$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowEffects)
        );

        this.showExif$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowExif)
        );

        this.showHistogram$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowHistogram)
        );

        this.showMinimap$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowMinimap)
        );

        this.showRatings$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectPhotoInfoPanelShowRatings)
        );
    }

    ngOnDestroy() {
        this.hotkeysService.remove(this.hotkeys);
    }

    toggleEndSidenav(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelExpandedStateRequest());
    }

    toggleRatings(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelRatingsRequest());
    }

    toggleComments(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelCommentsRequest());
    }

    toggleMetadataEditor(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelMetadataEditorRequest());
    }

    toggleExif(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelExifRequest());
    }

    toggleHistogram(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelHistogramRequest());
    }

    toggleEffects(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelEffectsRequest());
    }

    toggleMinimap(): void {
        this.store$.dispatch(SettingsStoreActions.togglePhotoInfoPanelMinimapRequest());
    }

    private configureHotkeys(isAdmin: boolean): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('i', (event: KeyboardEvent) => this.onHotkeyToggleEndSidenav(event), [], 'Show / Hide Info Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('r', (event: KeyboardEvent) => this.onHotkeyToggleRatings(event), [], 'Show / Hide Ratings Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('c', (event: KeyboardEvent) => this.onHotkeyToggleComments(event), [], 'Show / Hide Comments Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('w', (event: KeyboardEvent) => this.onHotkeyToggleExif(event), [], 'Show / Hide EXIF Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('h', (event: KeyboardEvent) => this.onHotkeyToggleHistogram(event), [], 'Show / Hide Histogram Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('e', (event: KeyboardEvent) => this.onHotkeyToggleEffects(event), [], 'Show / Hide Effects Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('m', (event: KeyboardEvent) => this.onHotkeyToggleMinimap(event), [], 'Show / Hide Minimap')
        ) as Hotkey);

        if(isAdmin) {
            this.hotkeys.push(this.hotkeysService.add(
                new Hotkey('g', (event: KeyboardEvent) => this.onHotkeyToggleMetadataEditor(event), [], 'Show / Hide Metadata Editor')
            ) as Hotkey);
        }
    }

    private onHotkeyToggleEndSidenav(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleInfoPanelButton);
        this.toggleEndSidenav();

        return false;
    }

    private onHotkeyToggleRatings(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleRatingsButton);
        this.togglePanel(this.showRatings$, () => this.toggleRatings());

        return false;
    }

    private onHotkeyToggleComments(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleCommentsButton);
        this.togglePanel(this.showComments$, () => this.toggleComments());

        return false;
    }

    private onHotkeyToggleMetadataEditor(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleMetadataEditorButton);
        this.togglePanel(this.showMetadataEditor$, () => this.toggleMetadataEditor());

        return false;
    }

    private onHotkeyToggleExif(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleExifButton);
        this.togglePanel(this.showExif$, () => this.toggleExif());

        return false;
    }

    private onHotkeyToggleHistogram(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleHistogramButton);
        this.togglePanel(this.showHistogram$, () => this.toggleHistogram());

        return false;
    }

    private onHotkeyToggleEffects(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleEffectsButton);
        this.togglePanel(this.showEffects$, () => this.toggleEffects());

        return false;
    }

    private onHotkeyToggleMinimap(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleMinimapButton);
        this.togglePanel(this.showMinimap$, () => this.toggleMinimap());

        return false;
    }

    private togglePanel(showPanel$: Observable<boolean>, toggleFunc: () => void): void {
        combineLatest([
            this.endSidenavExpanded$,
            showPanel$
        ]).pipe(
            filter(x => x[0] != null && x[1] != null),
            take(1),
            map(x => {
                if (!x[0]) {
                    // show info panel if hidden
                    this.toggleEndSidenav();

                    if (!x[1]) {
                        // if detail panel hidden, make sure we show this too
                        toggleFunc();
                    }
                } else {
                    toggleFunc();
                }
            })
        ).subscribe();
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }
}
